// https://github.com/GoogleChrome/puppeteer/blob/master/lib/BrowserFetcher.js

//import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { Global } from './global';
import * as util from 'util';
import * as URL from 'url';
import * as removeRecursive from 'rimraf';
import { revisionInfoType, progressCallbackType } from './types';
import { revision } from './constants';
//const { Helper, assert } = require('./helper');
import { Helper, assert } from './helper';

const ProxyAgent = Global.httpsProxyAgent;

// @ts-ignore
const getProxyForUrl = require('proxy-from-env').getProxyForUrl;

const DEFAULT_DOWNLOAD_HOST = 'https://dl.bintray.com/bringout';

const readdirAsync = Helper.promisify(fs.readdir.bind(fs));
const mkdirAsync = Helper.promisify(fs.mkdir.bind(fs));
const unlinkAsync = Helper.promisify(fs.unlink.bind(fs));

export class Fetcher {
	private _downloadsFolder: string;
	private _downloadHost: string;
	private _platform: string;
	private _packageName: string;
	private _zipPath: string;
	private _cleanup: boolean; // Remove old revisions.
	private _execPath: string;
	private _execHash: string;

	constructor(projectRoot: string, options: any = {}) {
		this._downloadsFolder = options.path || path.join(projectRoot, '.local');
		this._downloadHost = options.host || DEFAULT_DOWNLOAD_HOST;
		this._platform = options.platform || Helper.os_platform();
		this._packageName = options.packageName || 'F18';
		this._zipPath = '';
		this._cleanup = options.cleanup || true;
		this._execPath = path.join(this._getFolderPath(revision), (options.execPath || this._packageName));
		this._execHash = options.execHash || '0';
	}

	public canDownload(revision: string): Promise<boolean|any> {

		const url = downloadURL(this._downloadHost, this._platform, this._packageName, revision);
		let resolve: any;
		const promise = new Promise((x) => (resolve = x));
		const request = httpRequest(url, 'HEAD', (response: any) => {
			resolve(response.statusCode === 200);
		});
		request.on('error', (error: any) => {
			console.error(error);
			resolve(false);
		});
		return promise;
	}
	
	public async download(revision: string, progressCallback: progressCallbackType): Promise<revisionInfoType> {
		const url = downloadURL(this._downloadHost, this._platform, this._packageName, revision);


		const {folderPath, execPath} = this.revisionInfo(revision);
		if (await existsAsync(folderPath) && await existsAsync(execPath)) // revision already exists
		{
			this._zipPath = '';
		    return this.revisionInfo(revision);
		}
		if (!await existsAsync(this._downloadsFolder)) await mkdirAsync(this._downloadsFolder);
		if (!await existsAsync(this.revisionInfo(revision).folderPath)) await mkdirAsync(this.revisionInfo(revision).folderPath);

		try {
			this._zipPath = path.join(this.revisionInfo(revision).folderPath, `download.zip`);
			await downloadFile(url, this._zipPath, progressCallback);
		} catch {
			// u slucaju greske brisati zip
			if (await existsAsync(this._zipPath)) await unlinkAsync(this._zipPath);
		}
		const revisionInfo = this.revisionInfo(revision);
	
		return revisionInfo;
	}

	private _parseFolderPath(folderPath: string): {platform: string, revision: string} | null {
		const name = path.basename(folderPath);
	
		if (!name.startsWith(this._packageName + '-' + this._platform + '-'))
		  return null;
	
		// F18-windows-x64-20190119.1 =>  // 20190119.1
		const revision = name.replace(this._packageName + '-' + this._platform + '-', '');
	
		return { platform: this._platform, revision };
	}
	
	// lista lokalnih verzija
	public async localRevisions(): Promise<string[]> {
		if (!await existsAsync(this._downloadsFolder)) return [];
		const fileNames : any = await readdirAsync(this._downloadsFolder);
		return fileNames
			.map((fileName: string) => this._parseFolderPath(fileName))
			.filter((entry: any) => entry && entry.platform === this._platform)
			.map((entry: any) => entry.revision);
	}

	
	public async remove(revision: string) {
		const folderPath = this._getFolderPath(revision);
		assert(await existsAsync(folderPath), `Failed to remove: revision ${revision} is not downloaded`);
		await new Promise((fulfill) => {
			removeRecursive(folderPath, fulfill);
			// vscode.window.showInformationMessage(`verzija uklonjena: ${folderPath}`);
		});
	}


	public revisionInfo(revision: string): revisionInfoType {
		const folderPath = this._getFolderPath(revision);
		
		// else throw new Error('Unsupported platform: ' + this._platform);
		const url = downloadURL(this._downloadHost, this._platform, this._packageName, revision);
		const local = fs.existsSync(folderPath);
		const execUtils = Helper.is_windows() ? [ "psql.exe", "pg_dump.exe", "pg_restore.exe", "curl.exe"] : [ "psql", "pg_dump", "pg_restore", "curl"];

		return { revision, execPath: this._execPath, folderPath, local, url, zipPath: this._zipPath, 
			   cleanup: this._cleanup, execHash: this._execHash, execUtils };
	}


	private _getFolderPath(revision:string): string {
		// <DIR>/F18-windows-x64_20190119.2
		return path.join(this._downloadsFolder, this._packageName + '-' + this._platform + '-' + revision);
	}



}

function existsAsync(filePath: any): Promise<any> {
	let fulfill: any = null;
	const promise = new Promise((x) => (fulfill = x));
	fs.access(filePath, (err) => fulfill(!err));
	return promise;
}

function downloadURL(host: string, platform: string, packageName: string, revision:string): string {
	// https://dl.bintray.com/bringout/F18/F18-linux-x64_20190119.2.zip
	return util.format('%s/%s/%s-%s_%s.zip', host, packageName, packageName, platform, revision);	
}

function httpRequest(url: string, method: string, response: any) {

	const options: any = URL.parse(url);
	options.method = method;

	const proxyURL = getProxyForUrl(url);
	if (proxyURL) {
		const parsedProxyURL: any = URL.parse(proxyURL);
		parsedProxyURL.secureProxy = parsedProxyURL.protocol === 'https:';

		options.agent = new ProxyAgent(parsedProxyURL);
		options.rejectUnauthorized = false;
	}

	const requestCallback = (res: any) => {
		if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
			httpRequest(res.headers.location, method, response);
		else response(res);
	};
	const request =
		options.protocol === 'https:'
			? require('https').request(options, requestCallback)
			: require('http').request(options, requestCallback);
	request.end();
	return request;
}

function downloadFile(url: string, destinationPath: string, progressCallback: progressCallbackType) : Promise<any> {
	let fulfill: any, reject: any;
	let downloadedBytes = 0;
	let totalBytes = 0;

	const promise = new Promise((x, y) => {
		fulfill = x;
		reject = y;
	});

	const request = httpRequest(url, 'GET', (response: any) => {
		if (response.statusCode !== 200) {
			const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
			// consume response data to free up memory
			response.resume();
			reject(error);
			return;
		}
		const file = fs.createWriteStream(destinationPath);
		file.on('finish', () => fulfill());
		file.on('error', (error) => reject(error));
		response.pipe(file);
		totalBytes = parseInt /** @type {string} */(response.headers['content-length'], 10);
		if (progressCallback) response.on('data', onData);
	});
	request.on('error', (error: any) => reject(error));
	return promise;

	function onData(chunk: any) {
		downloadedBytes += chunk.length;
		progressCallback(downloadedBytes, totalBytes);
	}
}
