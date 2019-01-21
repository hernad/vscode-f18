// https://github.com/GoogleChrome/puppeteer/blob/master/lib/BrowserFetcher.js

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { Global } from './global';

// const extract = require('extract-zip');
import * as util from 'util';
import * as URL from 'url';
import * as removeRecursive from 'rimraf';
import * as vscode from 'vscode';

import { exec } from 'child_process';

const { Helper, assert } = require('./helper');

const ProxyAgent = Global.httpsProxyAgent;

// @ts-ignore
const getProxyForUrl = require('proxy-from-env').getProxyForUrl;

const DEFAULT_DOWNLOAD_HOST = 'https://dl.bintray.com/bringout';

const readdirAsync = Helper.promisify(fs.readdir.bind(fs));
const mkdirAsync = Helper.promisify(fs.mkdir.bind(fs));
const unlinkAsync = Helper.promisify(fs.unlink.bind(fs));



type progressCallbackType = (num1: number, num2: number) => void;
type revisionInfoType = { revision: string, executablePath: string, folderPath: string, local: boolean, url: string, zipPath: string };

/*
function archiveName(platform: string, revision:string): string {
	if (platform === 'linux') return 'chrome-linux';
	if (platform === 'mac') return 'chrome-mac';
	if (platform === 'win32' || platform === 'win64') {
		// Windows archive name changed at r591479.
		return parseInt(revision, 10) > 591479 ? 'chrome-win' : 'chrome-win32';
	}
	return null;
}
*/

function existsAsync(filePath: any) {
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



export class Fetcher {
	private _downloadsFolder: string;
	private _downloadHost: string;
	private _platform: string;
	private _packageName: string;
	private _zipPath: string;

	constructor(projectRoot: string, options: any = {}) {
		this._downloadsFolder = options.path || path.join(projectRoot, '.local');
		this._downloadHost = options.host || DEFAULT_DOWNLOAD_HOST;
		this._platform = options.platform || '';
		this._packageName = options.packageName || 'F18';
		this._zipPath = '';

		if (!this._platform) {
			const platform = os.platform();
			if (platform === 'darwin') this._platform = 'mac';
			else if (platform === 'linux') 
			    this._platform = (os.arch() === 'x64') ? 'linux-x64' : 'linux-x86';
			else if (platform === 'win32') 
			   this._platform = (os.arch() === 'x64') ? 'windows-x64' : 'windows-x86';
			else
			   assert(this._platform, 'Unsupported platform: ' + os.platform());
		}
		// assert(supportedPlatforms.includes(this._platform), 'Unsupported platform: ' + this._platform);
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

		

		const {folderPath, executablePath} = this.revisionInfo(revision);
		if (await existsAsync(folderPath) && await existsAsync(executablePath)) // revision already exists
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
	async localRevisions(): Promise<string[]> {
		if (!await existsAsync(this._downloadsFolder)) return [];
		const fileNames = await readdirAsync(this._downloadsFolder);
		return fileNames
			.map((fileName: string) => this._parseFolderPath(fileName))
			.filter((entry: any) => entry && entry.platform === this._platform)
			.map((entry: any) => entry.revision);
	}

	
	async remove(revision: string) {
		const folderPath = this._getFolderPath(revision);
		assert(await existsAsync(folderPath), `Failed to remove: revision ${revision} is not downloaded`);
		await new Promise((fulfill) => {
			removeRecursive(folderPath, fulfill);
			// vscode.window.showInformationMessage(`verzija uklonjena: ${folderPath}`);
		});
	}


	revisionInfo(revision: string): revisionInfoType {
		const folderPath = this._getFolderPath(revision);
		
		
		let executablePath = '';
		executablePath = path.join(folderPath, this._packageName);  // F18-windows-linux-x64_20199119.2/F18

		if (this._platform === 'windows-x86' || this._platform === 'windows-x64')
			// executablePath = path.join(folderPath, archiveName(this._platform, revision), this._packageName + '.exe');
			executablePath += '.exe';
		

		// else throw new Error('Unsupported platform: ' + this._platform);
		const url = downloadURL(this._downloadHost, this._platform, this._packageName, revision);
		const local = fs.existsSync(folderPath);
		return { revision, executablePath, folderPath, local, url, zipPath: this._zipPath };
	}


	private _getFolderPath(revision:string): string {
		// <DIR>/F18-windows-x64_20190119.2
		return path.join(this._downloadsFolder, this._packageName + '-' + this._platform + '-' + revision);
	}



}
