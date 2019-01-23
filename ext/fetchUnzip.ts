 import * as vscode from 'vscode';
import { unzipError } from './unzip';
import * as fs from 'fs';
import * as path from 'path';
import { Global } from './global';
import { Helper } from './helper';
import { Fetcher } from './fetcher';
import { unzip } from './unzip';
import * as md5File from 'md5-file/promise';

/*
 
const options = {
    host: 'https://dl.bintray.com/bringout', 
    packageName: 'F18',
    // platform: 'windows-x64'
    revision: '20190119.2'
 };
 fetchUnzip(options);

*/
export function vscodeFetchUnzip(options: any = {}): Thenable<{}> {

    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Download & Unzip",
        cancellable: true
    }, (progress, token) => {

        progress.report({ increment: 0 });

        var p = new Promise((resolve, reject) => {
            //resolve = () => { vscode.window.showInformationMessage('resolve funkcija!!')};
            token.onCancellationRequested(() => {
                vscode.window.showErrorMessage("Download/Unzip prekinut!?");
                unzipError();
                reject();
            });

            download(options, progress, resolve, reject);
        });

        p.then((params: any) => {
            if (fs.existsSync(params.revisionInfo.execPath)) fs.chmodSync(params.revisionInfo.execPath, 0o755);
            if (fs.existsSync(params.revisionInfo.zipPath)) fs.unlinkSync(params.revisionInfo.zipPath);
            // vscode.window.showInformationMessage('kraj resolve funkcije after unzip!');
            progress.report({ increment: 100, message: params.message });

        });

        return p;
    });
}


export async function download(options: any = {}, progress: vscode.Progress<{}>, resolve: any, error: any) {

    //const destDir = path.join(tmpdir(), generateUuid());
    const destDir = path.join(Global.context.extensionPath, '..', options.packageName);

    // vscode.window.showInformationMessage(destDir);

    Helper.mkdirp(destDir, () => {
        //vscode.window.showInformationMessage(`destDir: ${destDir}`);
    });

    // https://dl.bintray.com/bringout/F18/F18-linux-x64_20190119.2.zip

    const fetcher = new Fetcher(destDir, { path: destDir, ...options });
    let revisionInfo = fetcher.revisionInfo(options.revision);

    Global.execPath = revisionInfo.execPath;
    Global.folderPath = revisionInfo.folderPath;

    let progressBar = null;
    let lastDownloadedBytes = 0;

    const fetcherDownload = () => fetcher.canDownload(options.revision).then((canDownload: boolean) => {
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
                .then((revisionInfoNew) => revisionInfo = revisionInfoNew)
                .then(() => fetcher.localRevisions())
                .then((localRevisions: string[]) => {
                    // vscode.window.showInformationMessage('Downloaded to: ' + revisionInfo.folderPath);
                    const downloadZip = revisionInfo.zipPath;
                    if (downloadZip === '') {
                        // progress.report({increment: 100});
                        resolve({ message: 'no download', revisionInfo });
                    } else {
                        unzip(revisionInfo, progress, resolve, error).then(() => {
                            // vscode.window.showInformationMessage(`Lokalne verzije: ${localRevisions.join(' ')}`);
                            localRevisions = localRevisions.filter(revision => revision !== revisionInfo.revision);
                            if (revisionInfo.cleanup) {
                                const cleanupOldVersions = localRevisions.map(revision => fetcher.remove(revision));
                                return Promise.all([...cleanupOldVersions]);
                            } else {
                                return new Promise(() => { });
                            }
                        });
                    }

                })
                .catch((error) => {
                    vscode.window.showErrorMessage(`ERROR: Failed to download revision ${options.revision} : ${error}!?`);
                    // console.error(error);
                    process.exit(1);
                });
        } else
            vscode.window.showErrorMessage(`cannot download revision ${options.revision} ?!`);
    });

    md5File(revisionInfo.execPath)
        .then((hash: any) => {
            console.log(`The MD5 sum of ${revisionInfo.execPath} is: ${hash}`);
            if (hash !== revisionInfo.execHash) {
                Promise.resolve(fetcher.remove(revisionInfo.revision));
                fetcherDownload();
            }
            else resolve({ message: 'hash OK', revisionInfo });

        })
        .catch(() => {
            fetcherDownload();
        });

}