import { Global } from './global';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
// import { Transform } from 'stream';
// import { inc } from 'semver';
// import { tmpdir } from 'os';
// import { generateUuid } from './uuid';
// import { Fetcher } from './fetcher';
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

