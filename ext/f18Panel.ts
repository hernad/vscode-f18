import * as path from 'path';
import * as vscode from 'vscode';
import { vscodeFetchUnzip } from './fetchUnzip';
import { Helper } from './helper';
import { Global } from './global';
import { execHashList, revision } from './constants';
import { IConnection } from './IConnection';
import { PostgresConnection } from './postgresConnection';

// import { isContext } from 'vm';

const LINE_HEIGHT = 0.915;
const LETTER_SPACING = 0;
const RENDERER_TYPE = 'canvas'; // 'dom' | 'canvas'

const DEFAULT_WINDOWS_FONT_FAMILY = "Consolas, 'Courier New', monospace";
// const DEFAULT_MAC_FONT_FAMILY = 'Menlo, Monaco, \'Courier New\', monospace';
const DEFAULT_LINUX_FONT_FAMILY = "'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'";

// /home/hernad/vscode/src/vs/editor/common/config/commonEditorConfig.ts

// EDITOR_FONT_DEFAULTS.fontFamily

// https://stackoverflow.com/questions/35550855/best-way-to-handle-exception-globally-in-node-js-with-express-4



function modulExists(modul: string) {

    return ['fin', 'kalk', 'fakt', 'os', 'ld', 'pos', 'epdv', 'cmd'].
        findIndex((el) => el === modul) > 0

}

process.on('uncaughtException', function (error: Error) {
    // vscode.window.showErrorMessage(error.message)
    console.log(`uncaughtExceptionF18: ${error.message}`);
    globalHandler(error);
});


process.on('unhandledRejection', function (reason: Error, p) {
    // vscode.window.showErrorMessage(`promise unhandled rejection ${reason}`);
    globalHandler(reason);

});


function globalHandler(error: Error) {
    F18Panel.instances.forEach((f18Panel: F18Panel) => {
        if (error.message.includes(f18Panel.panelCaption)) {
            f18Panel.webPanel.dispose();

            // ako je neuspjesno kreirana instanca, ponovi
            const regex = /F18 (\w+) - \d+/;
            const caption = error.message;
            const modul = caption.replace(regex, "$1")
            if (modulExists(modul)) {
                console.log(`unhandledRejection novi pokusaj kreiranja: ${modul}`);
                F18Panel.create(modul);
            }
            else console.log(`unhandledRejection - ne znam sta uraditi sa: ${caption}`);

        }
    });
}

export class F18Panel {

    public static F18: F18Panel | undefined;
    public static isDownloadedBinary: boolean = false;
    public static firstTerminal: boolean = true;
    public static instances: F18Panel[] = [];
    public webPanel: vscode.WebviewPanel;

    public static create(modulF18: string) {
        // const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // const column = undefined;

        F18Panel.F18 = new F18Panel(modulF18, vscode.ViewColumn.One);

        vscode.window.onDidCloseTerminal((terminal: vscode.Terminal) => {
            // vscode.window.showInformationMessage(`onDidCloseTerminal, name: ${terminal.name}`);

            F18Panel.instances.forEach((f18Panel: F18Panel) => {
                if (f18Panel.panelCaption === terminal.name) {
                    f18Panel.terminalDisposed = true; // ovaj terminal je vec u procesu zatvaranja
                    f18Panel.webPanel.dispose();
                }

            });
            const filtered = F18Panel.instances.filter((f18Panel: F18Panel) => {
                return f18Panel.panelCaption !== terminal.name;
            });

            F18Panel.instances = filtered;

            if (F18Panel.instances.length == 0)
                F18Panel.currentPanelNum = 1;

        });
    }

    /*

    function selectTerminal(): Thenable<vscode.Terminal> {
        interface TerminalQuickPickItem extends vscode.QuickPickItem {
            terminal: vscode.Terminal;
        }
        const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
        const items: TerminalQuickPickItem[] = terminals.map(t => {
            return {
                label: `name: ${t.name}`,
                terminal: t
            };
        });
        return vscode.window.showQuickPick(items).then(item => {
            return item.terminal;
        });
    }

    function ensureTerminalExists(): boolean {
        if ((<any>vscode.window).terminals.length === 0) {
            vscode.window.showErrorMessage('No active terminals');
            return false;
        }
        return true;
    }

    */

    private static readonly viewType = 'F18';
    private static currentPanelNum = 1;

    public readonly panelCaption: string;
    private webPanelIsLive: boolean;
    private readonly extensionPath: string;
    // private disposables: vscode.Disposable[] = [];

    private terminalInstance?: vscode.Terminal;
    private readonly modul: string;
    private connection: IConnection;
    private adminConnection: IConnection;
    private readonly panelNum: number;
    private cols: number;
    private rows: number;
    private width: number;
    private height: number;
    private fontFamily: string;
    private fontSize: number;
    private terminalDisposed: boolean;
    private webPanelDisposed: boolean;
    private switchPosPM: string;

    private constructor(cModul: string, column: vscode.ViewColumn) {

        this.extensionPath = Global.context.extensionPath;
        this.modul = cModul;
        this.cols = 120;
        this.rows = 40;
        this.width = 0;
        this.height = 0;
        this.fontSize = 16;
        this.terminalDisposed = false;
        this.webPanelDisposed = false;
        this.webPanelIsLive = false;

        const tmpFS = vscode.workspace.getConfiguration('f18').get('fontSize');
        if (tmpFS !== undefined) {
            this.fontSize = tmpFS as number;
            // vscode.window.showErrorMessage(`fontsize: ${this.fontSize}`);
        }

        if (cModul === "pos") {
            this.switchPosPM = "--pos-pm " + vscode.workspace.getConfiguration('f18').get('posPM');
        } else
            this.switchPosPM = "";

        this.fontFamily = Helper.is_windows() ? DEFAULT_WINDOWS_FONT_FAMILY : DEFAULT_LINUX_FONT_FAMILY;
        const tmpFF = vscode.workspace.getConfiguration('editor', null).get('fontFamily');
        tmpFF !== undefined
            ? (this.fontFamily = tmpFF as string)
            : vscode.window.showErrorMessage('config editor.fontFamily?!');

        this.panelNum = F18Panel.currentPanelNum;
        this.panelCaption = `F18 ${this.modul} - ${this.panelNum}`;
        F18Panel.currentPanelNum++;

        const getConnectionThenRun = () => PostgresConnection.getDefaultConnection().then((connection: IConnection) => {
            this.connection = connection;
            PostgresConnection.getDefaultConnection('admin').then((adminConnection: IConnection) => {
                this.adminConnection = adminConnection;
                this.afterConnect();
            }).catch(() => {
                this.adminConnection = undefined;
                this.afterConnect();
            });
        })

        const runSelect = vscode.workspace.getConfiguration('f18').get('selectDatabaseOnStart');
        try {
            if (!F18Panel.isDownloadedBinary && runSelect)
                vscode.commands.executeCommand('f18.selectDatabase')
                    .then(() => setTimeout(getConnectionThenRun, 770)); // timeout potreban da se propagira promjena konfiguracije
            else
                getConnectionThenRun();
        } catch {
            throw (this.panelCaption);
        }
    }


    private afterConnect() {

        this.webPanel = vscode.window.createWebviewPanel(
            F18Panel.viewType,
            this.panelCaption,
            { viewColumn: undefined, preserveFocus: false },
            {
                enableScripts: true, // Enable javascript in the webview
                retainContextWhenHidden: true,

                // And restric the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, 'cli')),
                    vscode.Uri.file(path.join(this.extensionPath, 'build'))
                ]
            }
        );
        this.webPanelDisposed = false;
        this.configurePanel();
        F18Panel.instances.push(this);

        this.webPanel.webview.html = this._getHtmlForWebview();

        const fetchOptions = {
            host: 'https://dl.bintray.com/bringout',
            packageName: 'F18',
            // platform: 'windows-x64'
            revision,
            cleanup: true,
            execPath: (Helper.is_windows() ? 'F18.exe' : 'F18'),
            execHash: execHashList[Helper.os_platform()]
        };

        const createTerminalInstance = () => {

            this.terminalInstance = vscode.window.createTerminal(this.panelCaption, shell());
            this.terminalInstance.processId
                .then(
                    (processId: number) => {
                        console.log(`kreiran terminal ${processId}`);
                        this.terminalDisposed = false;
                        const config = vscode.workspace.getConfiguration('f18'); //.get('fullScreen');
                        const configMerged = {
                            ...config,
                            rendererType: RENDERER_TYPE,
                            fontFamily: this.fontFamily,
                            letterSpacing: LETTER_SPACING,
                            lineHeight: LINE_HEIGHT
                        };

                        let count = 0;
                        const dim = () => setTimeout(() => {
                            console.log(`term-get-dimensions webPanelIsLive ${this.webPanelIsLive}`);
                            if (this.webPanelIsLive) {
                                this.webPanel.webview.postMessage({
                                    command: 'term-get-dimensions',
                                    data: JSON.stringify(configMerged)
                                })
                            } else {
                                count++;
                                if (count > 3)
                                    throw new Error(this.panelCaption)
                                else
                                    dim();
                            }
                        }, 300);

                        dim();

                        // test handliranja greske
                        // if (this.panelCaption.includes('2'))
                        //    throw new Error(this.panelCaption);

                    },
                    () => {
                        console.log(`terminal ${this.panelCaption} se ne može kreirati?!`);
                        throw new Error(this.panelCaption);
                    }
                );
        }


        try {
            if (!F18Panel.isDownloadedBinary) {
                vscodeFetchUnzip(fetchOptions).then(() => {
                    F18Panel.isDownloadedBinary = true;
                    createTerminalInstance();
                });
            } else {
                createTerminalInstance();
            }
        } catch (e) {
            throw new Error(this.panelCaption);
        }


    }

    public configurePanel() {

        this.webPanel.onDidDispose(() => {

            if (this.webPanelDisposed) return;

            // ovo se desi kada nasilno ugasimo tab (kada ne izadjemo iz F18 regularno)
            if (!this.terminalDisposed && this.terminalInstance) {
                this.terminalInstance.dispose();
                this.terminalDisposed = true;
            }
            this.webPanelDisposed = true;
        });

        // Handle messages from the webview
        this.webPanel.webview.onDidReceiveMessage((message: any) => {
            switch (message.command) {

                case 'pong':
                    this.webPanelIsLive = true;
                    break;

                case 'ready':
                    // pingaj webview to check its correctness
                    this.webPanel.webview.postMessage({ command: 'ping' });
                    break;

                case 'alert':
                    vscode.window.showErrorMessage(message.data);
                    break;

                case 'quit':
                    vscode.window.showErrorMessage(message.data);
                    this.webPanel.dispose();
                    break;

                case 'dimensions-error':
                    vscode.window.showErrorMessage(`received message data: ${message.data}`);
                    this.webPanel.dispose();
                    break;

                case 'cli-dimensions':
                    this.computeDimensions(message.data);
                    this.createTerminal();
                    break;

                case 'cli-focus':
                    // @ts-ignore
                    if (this.terminalInstance!.resize) this.terminalInstance!.resize(this.cols, this.rows);
                    // vscode.window.showInformationMessage(`cli-focus: resize ${this.cols} x ${this.rows}`);
                    break;

                case 'cli-input':
                    // input konzole
                    if (this.terminalInstance) {
                        // https://www.vt100.net/docs/vt510-rm/chapter4.html#T4-5

                        // Cursor Position Report	CSI 6 n	same	same	CPR
                        // Response:	CSI Pl; Pc R
                        // Pl	No. of lines
                        // Pc	No. of columns
                        if ((new RegExp("\\x1b\\[\\d+;\\d+R")).test(message.data)) {
                            //vscode.window.showInformationMessage('ulovio response NA CPR - e.g: ESC[2;2R]');
                        } else {
                            this.terminalInstance.sendText(message.data, false);
                        }
                    }
            }
        });
    }

    public computeDimensions(msg_data: string) {
        const dims = JSON.parse(msg_data);
        this.width = dims.width;
        this.height = dims.height;

        this.rows = dims.rows;
        this.cols = dims.cols;
        // vscode.window.showInformationMessage(`rows: ${this.rows}, cols: ${this.cols}`);
    }

    public createTerminal() {

        // [vscode#view-pdf]/tmp/jedan.pdf[vscode#end]
        const regexCursorPosition = new RegExp("\\x1b\\[\\d+;\\d+H", "g");
        const regexClearLineCurRight = new RegExp("\\x1b\\[0K", "g"); // windows terminal

        const regexVsCodePdf = new RegExp("\\[vscode#(\\S+)\\](.*)\\[vscode#end\\]");

        // kad nema this.terminal.show [uncaught exception]: TypeError: Cannot read property 'classList' of undefined
        this.terminalInstance!.show(true);
        // @ts-ignore
        if (this.terminalInstance!.resize) this.terminalInstance!.resize(this.cols, this.rows);
        this.terminalInstance!.hide();

        const cmdSeparator = Helper.is_windows() ? '&' : ';';

        // soft link (x64: /lib64/libpcre.so | x86: /usr/lib/libpcre.so.1) -> libpcre.so.3  
        const linuxFixes = `if ! ldconfig -p|grep -q libpcre.so.3 ;then if [[ -e /lib64/libpcre.so ]]; then ln -sf /lib64/libpcre.so ${Global.folderPath}/libpcre.so.3; else ln -sf /usr/lib/libpcre.so.1 ${Global.folderPath}/libpcre.so.3 ;fi; fi`;

        let adminParams = '';
        if (this.adminConnection !== undefined) {
            adminParams = `-ua ${this.adminConnection.user} -pa ${this.adminConnection.password}`;
        }
        let runExe: string;
        if (this.modul !== 'cmd')
            runExe = `${Global.execPath} 2>${this.modul}_${this.panelNum}.log --dbf-prefix ${this.panelNum} -h ${this.connection.host} -y ${this.connection.port} ${adminParams}  -u ${this.connection.user} -p ${this.connection.password} -d ${this.connection.database} --${this.modul} ${this.switchPosPM} ${cmdSeparator} exit`;
        
        //console.log(runExe);
        // const runExe = `echo ${Global.execPath} 2 VECE ${this.modul}_${this.panelNum}.log -h 192.168.124.1 -y 5432 -u hernad -p hernad -d ${this.f18Organizacija} --${this.modul}`;

        const f18HomePath = path.join(Global.folderPath, '..', 'data');
        Helper.mkdirp(f18HomePath, () => { });

        let sendInitCmds: string[] = [];

        sendInitCmds.push("");

        if (Helper.is_windows()) {
            sendInitCmds.push(`mode con: cols=${this.cols} lines=${this.rows}`);
            sendInitCmds.push('cls');
            // ako mode con: => ... Lines: 3000 => exit
            sendInitCmds.push(
                'powershell "$lines=(cmd /c mode con 2>&1 | Select-String -Pattern Lines: | Select-String 3000) ; if  ([bool]$lines) { exit 1 }"'
            );
            sendInitCmds.push('if %errorlevel% neq 0 exit');
            sendInitCmds.push(`cd ${Global.folderPath}`);
            sendInitCmds.push(`set PATH=${Global.folderPath}\\bin;${Global.folderPath};%PATH%`);
            sendInitCmds.push(`set F18_HOME=${f18HomePath}`);
            sendInitCmds.push('set F18_ESHELL=1');
            sendInitCmds.push(`cd %F18_HOME%`);
            (this.modul !== 'cmd') ? sendInitCmds.push('cls') : sendInitCmds.push('echo %CD%');

        } else {
            sendInitCmds.push(`stty cols ${this.cols} rows ${this.rows}`);
            sendInitCmds.push(`if stty size | grep '${this.rows} ${this.cols}' ; then echo size-ok; else exit 1; fi`);
            sendInitCmds.push(`cd ${Global.folderPath}`);
            if (F18Panel.firstTerminal) {
                sendInitCmds.push(linuxFixes);
                F18Panel.firstTerminal = false;
            }
            sendInitCmds.push(`export LD_LIBRARY_PATH=${Global.folderPath}`);
            sendInitCmds.push('export F18_ESHELL=1');
            sendInitCmds.push(`export F18_HOME=${f18HomePath}`);
            sendInitCmds.push(`cd $F18_HOME`);
            (this.modul !== 'cmd') ? sendInitCmds.push('clear') : sendInitCmds.push('pwd');
        }


        if (this.modul !== 'cmd')
            sendInitCmds.push(runExe);

        const termOptions = {
            cols: this.cols,
            rows: this.rows,
            cursorBlink: true,
            bellStyle: 'sound',
            cursorStyle: 'block', // cursorStyle: 'underline','bar',
            rendererType: RENDERER_TYPE,
            experimentalCharAtlas: 'dynamic',
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            letterSpacing: LETTER_SPACING,
            lineHeight: LINE_HEIGHT,
            termName: this.panelCaption
        };
        this.webPanel.webview.postMessage({ command: 'term-create', data: JSON.stringify(termOptions) });

        sendInitCmds.forEach((element) => {
            this.terminalInstance!.sendText(element);
        });

        (this.terminalInstance as any).onDidWriteData((data: string) => {
            // ovdje se hvata output konzole
            // console.log('onDidWriteData: ' + data);

            // ocistiti data od Cursor position komandi
            let cleanData = data.replace(regexCursorPosition, '');
            cleanData = cleanData.replace(regexClearLineCurRight, '');
            // https://stackoverflow.com/questions/20856197/remove-non-ascii-character-in-string
            //cleanData = cleanData.replace(/[^\x00-\x7F]/g, "");
            cleanData = cleanData.replace(new RegExp('\r?\n', 'g'), '');

            //console.log(`clean data: ${encodeURIComponent(cleanData)}`);

            if (regexVsCodePdf.test(cleanData)) {
                const match = cleanData.match(regexVsCodePdf);

                const sendOut = cleanData.replace(match[0], '');
                const fileName = match[2].replace(regexCursorPosition, '');
                //vscode.window.showInformationMessage(`${match[1]} ${fileName}`);

                const fileUri: vscode.Uri = vscode.Uri.file(fileName);
                console.log(`match ${fileName} fileUri: ${fileUri}`);
                // mora se malo sacekati da terminal osvjezi F18 screen
                setTimeout(
                    () => {
                        console.log(`vscode-resource: ${fileUri.with({ scheme: 'vscode-resource' }).toString()}`);
                        vscode.commands.executeCommand(match[1], fileUri.with({ scheme: 'vscode-resource' }).toString());
                    },
                    300
                );
                this.webPanel.webview.postMessage({ command: 'term-write', data });
            } else {
                this.webPanel.webview.postMessage({ command: 'term-write', data });
            }
        });
    }

    /*
    public dispose() {

        if (!this.terminalDisposed && this.terminalInstance) {
            this.terminalDisposed = true;
            this.terminalInstance.dispose();
        }

        if (!this.webPanelDisposed && this.webPanel) {
            this.webPanelDisposed = true;
            this.webPanel.dispose();
        }

        // while (this.disposables.length) {
        // 	const x = this.disposables.pop();
        // 	if (x) {
        // 		x.dispose();
        // 	}
        // }
        F18Panel.F18 = undefined;
    }
    */


    private _getHtmlForWebview() {
        // const manifest = require(path.join(this.extensionPath, 'out', 'asset-manifest.json'));
        // const mainScript = 'index.js';
        // const mainStyle = 'index.css';

        const mainScript = 'dist/bundle.js';

        const xtermStyle = 'node_modules/vscode-xterm/lib/xterm.css';
        // const xtermFullScreenStyle = 'node_modules/xterm/dist/addons/fullscreen/fullscreen.css';
        const mainStyle = 'index.css';

        // const mode = 'development';
        const mode = 'production.min';

        /*
        const reactScript1 = `node_modules/react/umd/react.${mode}.js`;
        const reactScript2 = `node_modules/react-dom/umd/react-dom.${mode}.js`;
    
        //<script src="./node_modules/react/umd/react.development.js"></script>
        //<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
        */

        const scriptPathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'build', mainScript));
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });

        /*
        const scriptReact1OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript1));
        const scriptReact1Uri = scriptReact1OnDisk.with({ scheme: 'vscode-resource' });

        const scriptReact2OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript2));
        const scriptReact2Uri = scriptReact2OnDisk.with({ scheme: 'vscode-resource' });
        */

        const xermStylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', xtermStyle));
        const xtermStyleUri = xermStylePathOnDisk.with({ scheme: 'vscode-resource' });

        // const xermFullScreenStylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', xtermFullScreenStyle));
        // const xtermFullScreenStyleUri = xermFullScreenStylePathOnDisk.with({ scheme: 'vscode-resource' });

        const stylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', mainStyle));
        const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

        // Use a nonce to whitelist which scripts can bereact.development.js run
        const nonce = getNonce();

        const strHtml = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>F18 screen</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<link rel="stylesheet" type="text/css" href="${xtermStyleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src http://localhost:5000; img-src vscode-resource: https: http:; script-src 'unsafe-eval' 'nonce-${nonce}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(this.extensionPath).with({ scheme: 'vscode-resource' })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
            </html>`;


        /*
            hernad: react-out
            <script nonce="${nonce}" src="${scriptReact1Uri}"></script>
            <script nonce="${nonce}" src="${scriptReact2Uri}"></script>
        */

        return strHtml;
    }
}

function getNonce() {
    let text = '';
    const possible = 'AF18DEFGHIJK3-XQvabcdefghijklmnopqrstuvwxyz012ea890';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function shell() {
    if (Helper.is_windows()) {
        return 'cmd.exe';
    } else {
        return '/bin/bash';
    }
}