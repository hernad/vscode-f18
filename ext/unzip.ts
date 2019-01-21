import { Global } from './global';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Transform } from 'stream';
import { inc } from 'semver';
import { tmpdir } from 'os';
import { generateUuid } from './uuid';
import { Fetcher } from './fetcher';
import { Helper } from './helper';

type revisionInfoType = { revision: string, executablePath: string, folderPath: string, local: boolean, url: string, zipPath: string };

const yauzl = Global.yauzl;

let yauzlOpen = Helper.promisify(yauzl.open);

// https://github.com/thejoshwolfe/yauzl/blob/master/examples/unzip.js


let zipfile: any;

export function unzipError() {
    zipfile.emit('error');
    zipfile.close();
    // zipfile.emit('end');
    
}

export async function download(options: any = {}, progress: vscode.Progress<{}>, resolve: any, error: any) {

     //const destDir = path.join(tmpdir(), generateUuid());
     const destDir = path.join(Global.context.extensionPath, '..', options.packageName);

     // vscode.window.showInformationMessage(destDir);

     Helper.mkdirp(destDir,() => {
         //vscode.window.showInformationMessage(`destDir: ${destDir}`);
     });
 
     // https://dl.bintray.com/bringout/F18/F18-linux-x64_20190119.2.zip

     const fetcher = new Fetcher(destDir, {path: destDir, ...options});
 
     let revisionInfo = fetcher.revisionInfo(options.revision);
 
     let progressBar = null;
     let lastDownloadedBytes = 0;
 
     fetcher.canDownload(options.revision).then((canDownload: boolean) => {
        if (canDownload) {
           progress.report({ message: "Start download" });
           fetcher.download(revisionInfo.revision, (downloadedBytes: number, totalBytes: number) => {
             /*
                 if (!progressBar) {
                 const ProgressBar = require('progress');
                 progressBar = new ProgressBar(`Downloading Firefox+Puppeteer ${revision.substring(0, 8)} - ${toMegabytes(totalBytes)} [:bar] :percent :etas `, {
                 complete: '|',
                 incomplete: ' ',
                 width: 20,
                 total: totalBytes,
                 });
                }
                 const delta = downloadedBytes - lastDownloadedBytes;
                 lastDownloadedBytes = downloadedBytes;
                 progressBar.tick(delta);
              */
            })
            .then( (revisionInfoNew) => revisionInfo = revisionInfoNew)
            .then(() => fetcher.localRevisions())
            .then((localRevisions: string[]): Promise<any> => {
                 // vscode.window.showInformationMessage('Downloaded to: ' + revisionInfo.folderPath);
                 const downloadZip = revisionInfo.zipPath;
                 if (downloadZip === '') {
                    // progress.report({increment: 100});
                    resolve({message: 'no download', revisionInfo});
                 } else {
                   progress.report({ message: "Start unzip" });
                   unzip(revisionInfo, progress, resolve, error);
                 }
                 // vscode.window.showInformationMessage(`Lokalne verzije: ${localRevisions.join(' ')}`);
                 localRevisions = localRevisions.filter(revision => revision !== revisionInfo.revision);
                 // Remove revisions.
                 const cleanupOldVersions = localRevisions.map(revision => fetcher.remove(revision));
                 return Promise.all([...cleanupOldVersions]);
             })
             .catch((error) => {
                vscode.window.showErrorMessage(`ERROR: Failed to download revision ${options.revision} : ${error}!?`);
                // console.error(error);
                process.exit(1);
             });
       } else
           vscode.window.showErrorMessage(`cannot download revision ${options.revision} ?!`);
     })
 
}

export async function unzip(revisionInfo: revisionInfoType, progress: vscode.Progress<{}>, resolve: any, error: any) {
    
    //vscode.window.showInformationMessage(path.dirname(__filename));
    const destDir = revisionInfo.folderPath;

    try {
       zipfile = await yauzlOpen(revisionInfo.zipPath, { lazyEntries: true });
    } catch {
        vscode.window.showErrorMessage('zip error?');
        error();
    }

    zipfile.on('error', () => {
        vscode.window.showErrorMessage('zip error/2 ?');
        error();
    });
		    
    let handleCount = 0;
    
	function incrementHandleCount() {
		handleCount++;
	}
    
    function decrementHandleCount() {
		handleCount--;
		if (handleCount === 0) {
			// vscode.window.showInformationMessage('all input and output handles closed');
		}
	}
    // progress.report({ increment: 100, message: "End" });

    // vscode.window.showInformationMessage(`number of entries: ${zipfile.entryCount}`);
    let openReadStream = Helper.promisify(zipfile.openReadStream.bind(zipfile));
    //let openReadStream = promisify(zipfile.openReadStream);
    
    let count = 0;
    
    zipfile.readEntry();
    
    //zipfile.on('error')

    zipfile.on('entry', async(entry: any) => {
        
        let increment = Math.round(1/zipfile.entryCount * 100);

        count++;

        // console.log(`increment ${increment}`);
		if (/\/$/.test(entry.fileName)) {
            // vscode.window.showInformationMessage( `/ directory:  ${entry.fileName}`);
            progress.report({ increment, message: `dir: ${entry.fileName}` });

			Helper.mkdirp(path.join(destDir, entry.fileName), async () => {
                // if (err) throw err;
                zipfile.readEntry();
			});
		} else {
			// ensure parent directory exists
			Helper.mkdirp(path.join(destDir, path.dirname(entry.fileName)), async () => {
                // vscode.window.showInformationMessage(`file: ${entry.fileName}`);
                
                let readStream: any = await openReadStream(entry);
                readStream.on('end', () => {
                    // console.log("<EOF>");
                   progress.report({ increment, message: `unzipped: ${entry.fileName} : ${entry.uncompressedSize}` });
                   setTimeout( () => {
                     zipfile.readEntry();
                   }, 300);

                });
    
                //stream.pipe(process.stdout);

                let writeStream = fs.createWriteStream(path.join(destDir, entry.fileName));
				incrementHandleCount();
                writeStream.on('close', decrementHandleCount);
                
                readStream.pipe(writeStream);
                    
			});
		}
    });
    
   
	zipfile.on('end', () => {

        if (count !== zipfile.entryCount) {
           vscode.window.showErrorMessage(`zip error ${count} <> ${zipfile.entryCount} ?!`);
           error();
        } else {
           //vscode.window.showInformationMessage(`zip end ${zipfile.entryCount}`);
           resolve( { message: `zip end ${zipfile.entryCount}`, revisionInfo });
        }

    });


}

