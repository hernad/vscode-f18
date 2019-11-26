import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { vscodeFetchUnzip } from './fetchUnzip';
import { Helper } from './helper';
import { Global, vscode_version_match } from './global';
import { execHashList, revision } from './constants';
import { IConnection } from './IConnection';
import { PostgresConnection } from './postgresConnection';
// import { string } from 'prop-types';
import { IPtyForkOptions, IPty } from 'node-pty';
import { Disposable } from 'vscode';
// import { isUndefined } from 'lodash';

// import { isContext } from 'vm';

/* canvas-nowebgl
const LINE_HEIGHT = 0.915;
const LETTER_SPACING = 0;
*/
const LINE_HEIGHT = 0.920;
const LETTER_SPACING = 1;

const RENDERER_TYPE = 'canvas'; // 'dom' | 'canvas'

const DEFAULT_WINDOWS_FONT_FAMILY = "Consolas, 'Courier New', monospace";
// const DEFAULT_MAC_FONT_FAMILY = 'Menlo, Monaco, \'Courier New\', monospace';
const DEFAULT_LINUX_FONT_FAMILY = "'Source Code Pro', Hack, 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'";

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
            //if (f18Panel.
            if (!f18Panel.webPanelDisposed)
                f18Panel.webPanel.dispose();

            // ako je neuspjesno kreirana instanca, ponovi
            // const regex = /F18 (\w+) - \d+/;
            // const caption = error.message;
            //const modul = caption.replace(regex, "$1")
            //if (modulExists(modul)) {
            //    vscode.window.showErrorMessage(caption);
            //console.log(`unhandledRejection novi pokusaj kreiranja: ${modul}`);
            //F18Panel.create(modul);
            //}
            //else {
            vscode.window.showErrorMessage(`Problem sa pokretanjem: ${error.message}`);
            //console.log(`unhandledRejection - ne znam sta uraditi sa: ${caption}`);
            //}
        }
    });
}

export class F18Panel {

    // public static F18: F18Panel | undefined;
    public static downloadNew: boolean;
    public static webGL: boolean;
    public static isDownloadedBinary: boolean = false;
    public static firstTerminal: boolean = true;
    public static instances: F18Panel[] = [];
    public webPanel: vscode.WebviewPanel;
    public lostFocus: boolean = false;

    public static createF18Instance(modulF18: string) {
        // const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // const column = undefined;

        new F18Panel(modulF18, vscode.ViewColumn.One);
        F18Panel.downloadNew = vscode.workspace.getConfiguration('f18').get('download');
        F18Panel.webGL = vscode.workspace.getConfiguration('f18').get('webGL');
        //F18Panel.downloadNew = true;

        // ako se ne zeli download, stavi marker da je download izvrsen
        //if (!downloadBinary)
        //  F18Panel.isDownloadedBinary = true;


        /*
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

            // izbaciti iz liste instanci ovu koju gasimo
            F18Panel.instances = filtered;

            //if (F18Panel.instances.length == 0)
            //    F18Panel.currentPanelNum = 1;

        });
        */

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
    //private static currentPanelNum = 1;

    public readonly panelCaption: string;
    private webPanelIsAlive: boolean;
    private readonly extensionPath: string;
    //private disposables: vscode.Disposable[] = [];

    // private terminalInstance: vscode.Terminal;
    public webPanelDisposed: boolean;
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
    private terminalKilled: boolean;

    private switchPosPM: string;
    private termBuffer: string[] = [];
    private _ptyProcess: IPty;


    private constructor(cModul: string, column: vscode.ViewColumn) {


        this.extensionPath = Global.context.extensionPath;
        this.modul = cModul;
        this.cols = 120;
        this.rows = 40;
        this.width = 0;
        this.height = 0;
        this.fontSize = 16;
        this.terminalKilled = false;
        this.webPanelDisposed = false;
        this.webPanelIsAlive = false;

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

        console.log(`fontFamily: ${this.fontFamily}`);

        // instances = [ 'fin 1', 'kalk 1', 'fin 2', 'fakt 1', 'fin 3' ] => next kalk = 2
        let nLast = 0;
        F18Panel.instances.forEach(f18Panel => {
            const regexp = new RegExp(`F18 ${this.modul} - (\\d+)`);
            if (regexp.test(f18Panel.panelCaption)) {
                const match = f18Panel.panelCaption.match(regexp);
                const nNum = parseInt(match[1]);
                if (nNum > nLast) nLast = nNum;

            }
        });
        this.panelNum = nLast + 1;
        this.panelCaption = `F18 ${this.modul} - ${this.panelNum}`;



        const runSelect = vscode.workspace.getConfiguration('f18').get('selectDatabaseOnStart');

        /*
        (<any>vscode).window.onDidWriteTerminalData((e: any) => {
            //console.log(`onDidWriteData ${JSON.stringify(e)}`);
            if (!this.webPanelDisposed && e && e.terminal && this.terminalInstance && (this.terminalInstance.name == e.terminal.name))
                this.termWrite(e.data);
                console.log(`term: ${e.data}`);
        });
        */


        try {
            if (!F18Panel.isDownloadedBinary && runSelect)
                vscode.commands.executeCommand('f18.selectDatabase')
                    .then(() => setTimeout(this.getConnectionThenRun, 770)); // timeout potreban da se propagira promjena konfiguracije
            else
                this.getConnectionThenRun();
        } catch {
            throw (this.panelCaption);
        }
    }


    private getConnectionThenRun() {
        return PostgresConnection.getDefaultConnection()
            .then((connection: IConnection) => {
                this.connection = connection;
                PostgresConnection.getDefaultConnection('admin').then((adminConnection: IConnection) => {
                    this.adminConnection = adminConnection;
                    this.afterConnect();
                }).catch(() => {
                    this.adminConnection = undefined;
                    this.afterConnect();
                });
            });
    }

    private afterConnect() {

        console.log(`afterConnect`);
        this.webPanel = vscode.window.createWebviewPanel(
            F18Panel.viewType,
            this.panelCaption,
            { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                enableFindWidget: false,

                // And restric the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, 'cli')),
                    vscode.Uri.file(path.join(this.extensionPath, 'build'))
                ]
            }
        );

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

        const createPty = () => {

            console.log('createPty');

            //this.terminalInstance = vscode.window.createTerminal(this.panelCaption, shell());
            //this.terminalInstance.processId
            //    .then(
            //        (processId: number) => {
            // console.log(`kreiran terminal ${processId}`);
            this.terminalKilled = false;
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
                // console.log(`term-get-dimensions webPanelIsLive ${this.webPanelIsLive}`);
                if (this.webPanelIsAlive) {
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
            }, 700);

            dim();

            const ptyForkOptions: IPtyForkOptions = {
                name: Helper.is_windows() ? shell() : 'xterm-256color',
                cols: this.cols,
                rows: this.rows,
                cwd: process.cwd(),
                env: process.env
                /*
                env: Object.assign(
                    {},
                    ...Object.keys(process.env)
                        .filter((key: string) => !isUndefined(process.env[key]))
                        .map((key: string) => ({ [key]: process.env[key] }))
                ),
                */
            };

            let pty: IPty;
            if (Helper.is_windows()) {
                pty = Global.pty.spawn(shell(), '', ptyForkOptions);
            } else {
                pty = Global.pty.spawn(shell(), undefined, ptyForkOptions);
            }


            this._ptyProcess = pty;
            //this._ptyProcess.write('echo Hello World\r' );

            this._ptyProcess.onData((e: string) => {
                // console.log(`pty.onData: ${JSON.stringify(e)}`);
                if (!this.webPanelDisposed)
                    this.xtermWrite(e);
            });

            this._ptyProcess.onExit((e) => {
                console.log(`pty Exit: ${e.exitCode}`);
                this.terminalKilled = true;
                if (!this.webPanelDisposed) {
                    this.webPanel.dispose();
                }
            });


        }


        try {
            if (!F18Panel.isDownloadedBinary && F18Panel.downloadNew) {
                vscodeFetchUnzip(fetchOptions).
                    then(
                        () => {
                            F18Panel.isDownloadedBinary = true;
                            createPty();
                        },
                        () => {
                            vscode.window.showErrorMessage('catch fetch');
                            createPty();
                        }
                    );
            } else {
                createPty();
            }
        } catch (e) {
            throw new Error(this.panelCaption);
        }


    }

    public configurePanel() {

        this.webPanel.onDidDispose(() => {
            /*
            F18Panel.instances.forEach((f18Panel: F18Panel) => {
                if (f18Panel.panelCaption === this.panelCaption) {
                    // f18Panel.terminalDisposed = true; // ovaj terminal je vec u procesu zatvaranja
                    f18Panel.webPanel.dispose();
                }
    
            });
            */
            if (!this.webPanelDisposed) {
                this.webPanelDisposed = true;
                const filtered = F18Panel.instances.filter((f18Panel: F18Panel) => {
                    return f18Panel.panelCaption !== this.panelCaption;
                });
                // izbaciti iz liste instanci ovu koju gasimo
                F18Panel.instances = filtered;
            }

            if (!this.terminalKilled) {

                this.terminalKilled = true;
                this._ptyProcess.write( '\x1b[24;5~' ); // K_CTRL_F12
            }

        });

        /*
        this.webPanel.onDidChangeViewState((e) => {

            if (e.webviewPanel.active) {
                // vscode.window.showInformationMessage(`on change view: state active ${e.webviewPanel.title}`);
                // vscode.commands.executeCommand("default:type", { "text": '\t\t\t\t' } );
            }

        });
        */

        // Handle messages from the webview
        this.webPanel.webview.onDidReceiveMessage((message: any) => {
            switch (message.command) {

                case 'pong':
                    this.webPanelIsAlive = true;
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
                    this.setRowsCols(message.data);
                    this.createClientTerminal();
                    break;

                case 'cli-focus':

                    //this.terminalInstance.sendText('\x1b[I');
                    // vscode.window.showInformationMessage(`dobio fokus ${this.webPanel.title}`);
                    this._ptyProcess.resize(this.cols, this.rows);

                    break;

                case 'cli-input':

                    // input konzole
                    //if (this.terminalInstance) {
                    // https://www.vt100.net/docs/vt510-rm/chapter4.html#T4-5

                    // Cursor Position Report	CSI 6 n	same	same	CPR
                    // Response:	CSI Pl; Pc R
                    // Pl	No. of lines
                    // Pc	No. of columns
                    //if ((new RegExp("\\x1b\\[\\d+;\\d+R")).test(message.data)) {
                    //    //vscode.window.showInformationMessage('ulovio response NA CPR - e.g: ESC[2;2R]');
                    //} 
                    this._ptyProcess.write(message.data);
                    // console.log(`cli-input: ${JSON.stringify(message.data)} -> pty`);

                    break;

                //case 'term-show':
                //
                //    this.webPanel.webview.postMessage({ command: 'term-show' });
                //    break;

                case 'pdf-view':

                    const fileUri: vscode.Uri = vscode.Uri.file(message.data);
                    //console.log(`vscode-resource: ${fileUri.with({ scheme: 'vscode-resource' }).toString()}`);
                    vscode.commands.executeCommand("pdf.view", fileUri.with({ scheme: 'vscode-resource' }).toString());
                    break;
            }
        });

        // this.webPanel.webview.postMessage({ command: 'ping' });
    }


    public setRowsCols(msg_data: string) {
        const dims = JSON.parse(msg_data);
        this.width = dims.width;
        this.height = dims.height;

        this.rows = dims.rows;
        this.cols = dims.cols - 1;
        // vscode.window.showInformationMessage(`rows: ${this.rows}, cols: ${this.cols}`);
    }

    public createClientTerminal() {


        console.log(`createClientTerminal`);
        // [vscode#view-pdf]/tmp/jedan.pdf[vscode#end]
        //const regexCursorPosition = new RegExp("\\x1b\\[\\d+;\\d+H", "g");
        //const regexClearLineCurRight = new RegExp("\\x1b\\[0K", "g"); // windows terminal
        //const regexVsCodeCmd = new RegExp("\\[vscode#(\\S+)\\](.*)\\[vscode#end\\]");

        //if (vscode_version_match(1, 31)) {
        // ver 1.31.403
        // kad nema this.terminal.show [uncaught exception]: TypeError: Cannot read property 'classList' of undefined

        // console.log( `createClientTerminal ${this.rows} / ${this.cols}` );

        //this.terminalInstance.hide();
        // @ts-ignore
        //this.terminalInstance.resize(this.cols, this.rows);

        //if (vscode_version_match(1, 31)) 
        //this.terminalInstance.hide();

        const cmdSeparator = (shell() == 'cmd.exe') ? '&' : ';';

        if (!Global.folderPath) {
            Global.folderPath = path.join(Global.context.extensionPath, '..', 'F18', 'F18_0');
            Global.execPath = path.join(Global.folderPath, (Helper.is_windows() ? 'F18.exe' : 'F18'));
            if (!fs.existsSync(Global.execPath))
                vscode.window.showErrorMessage(`F18_0 exec ne postoji: ${Global.execPath}`);

        }

        // soft link (x64: /lib64/libpcre.so | x86: /usr/lib/libpcre.so.1) -> libpcre.so.3
        const linuxFixes = `if ! ldconfig -p|grep -q libpcre.so.3 ;then if [[ -e /lib64/libpcre.so.1 ]]; then ln -sf /lib64/libpcre.so.1 ${Global.folderPath}/libpcre.so.3; else ln -sf /usr/lib/libpcre.so.1 ${Global.folderPath}/libpcre.so.3 ;fi; fi`;

        let adminParams = '';
        if (this.adminConnection !== undefined) {
            adminParams = `-ua ${this.adminConnection.user} -pa ${this.adminConnection.password}`;
        }
        let runExe: string;
        if (this.modul !== 'cmd') {
            runExe = `${Global.execPath} 2>${this.modul}_${this.panelNum}.log --dbf-prefix ${this.panelNum} -h ${this.connection.host} -y ${this.connection.port} ${adminParams}  -u ${this.connection.user} -p ${this.connection.password} -d ${this.connection.database} --${this.modul} ${this.switchPosPM} ${cmdSeparator} exit`;
        };

        //console.log(runExe);
        // const runExe = `echo ${Global.execPath} 2 VECE ${this.modul}_${this.panelNum}.log -h 192.168.124.1 -y 5432 -u hernad -p hernad -d ${this.f18Organizacija} --${this.modul}`;

        const f18HomePath = path.join(Global.folderPath, '..', 'data');
        Helper.mkdirp(f18HomePath, () => { });

        let sendInitCmds: string[] = [];

        sendInitCmds.push("");

        if (Helper.is_windows()) {
            if (shell() != 'cmd.exe') {
                sendInitCmds.push(`mode con: cols=${this.cols} lines=${this.rows}`);
                sendInitCmds.push('');
                sendInitCmds.push('cls');
                /*
                // ako mode con: => ... Lines: 3000 => exit
                sendInitCmds.push(
                    '$lines=(cmd /c mode con 2>&1 | Select-String -Pattern Lines: | Select-String 3000) ; if  ([bool]$lines) { exit 1 }'
                );
                */
                sendInitCmds.push('');
                sendInitCmds.push(`cd ${Global.folderPath}`);
                sendInitCmds.push(`$env:PATH='${Global.folderPath}\\bin;${Global.folderPath};' + $env:PATH`);
                sendInitCmds.push(`$env:F18_HOME='${f18HomePath}'`);
                sendInitCmds.push(`$env:F18_ESHELL='1'`);
                sendInitCmds.push(`cd $env:F18_HOME`);
                (this.modul !== 'cmd') ? sendInitCmds.push('cls') : sendInitCmds.push('(Resolve-Path .\).Path');

            } else {
                sendInitCmds.push(`mode con: cols=${this.cols} lines=${this.rows}`);
                sendInitCmds.push('');
                sendInitCmds.push('cls');
                /*
                // ako mode con: => ... Lines: 3000 => exit
                sendInitCmds.push(
                    'powershell "$lines=(cmd /c mode con 2>&1 | Select-String -Pattern Lines: | Select-String 3000) ; if  ([bool]$lines) { exit 1 }"'
                );
                sendInitCmds.push('if %errorlevel% neq 0 exit');
                */
                sendInitCmds.push('');
                sendInitCmds.push(`cd ${Global.folderPath}`);
                sendInitCmds.push(`set PATH=${Global.folderPath}\\bin;${Global.folderPath};%PATH%`);
                sendInitCmds.push(`set F18_HOME=${f18HomePath}`);
                sendInitCmds.push('set F18_ESHELLy=1');
                sendInitCmds.push(`cd %F18_HOME%`);
                (this.modul !== 'cmd') ? sendInitCmds.push('cls') : sendInitCmds.push('echo %CD%');
            }

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
            // sendInitCmds.push(`echo -e "\\e[?1000;1006;1015h"`);  // enable mouse tracking

            (this.modul !== 'cmd') ? sendInitCmds.push('clear') : sendInitCmds.push('pwd');
        }


        if (this.modul !== 'cmd') {
            console.log(`runExe: ${runExe}`);
            sendInitCmds.push(runExe);
        }


        const termOptions = {
            cols: this.cols,
            rows: this.rows,
            cursorBlink: true,
            bellStyle: 'none',
            cursorStyle: 'block', // cursorStyle: 'block', 'underline','bar',
            rendererType: RENDERER_TYPE,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            letterSpacing: LETTER_SPACING,
            lineHeight: LINE_HEIGHT,
            termName: this.panelCaption,
            webGL: F18Panel.webGL,
            theme: { background: "#1e1e1e", foreground: "#cccccc", cursor: "#cccccc", cursorAccent: "#1e1e1e", selection: "rgba(255, 255, 255, 0.25)", black: "#000000", red: "rgb(251, 122, 1)", green: "#0dbc79", yellow: "#e5e510", blue: "rgb(30, 29, 105)", magenta: "#bc3fbc", cyan: "#11a8cd", white: "#f8f5f5", brightBlack: "#666666", brightRed: "rgb(236, 10, 10)", brightGreen: "#23d18b", brightYellow: "#f5f543", brightBlue: "#3b8eea", brightMagenta: "#d670d6", brightCyan: "#29b8db", brightWhite: "#e5e5e5" },
            scrollback: 1000,
            drawBoldTextInBrightColors: true,
            fontWeight: "normal",
            fontWeightBold: "bold",
            // bellStyle: "none",
            macOptionIsMeta: false,
            macOptionClickForcesSelection: false,
            rightClickSelectsWord: false,
            fastScrollModifier: "alt",
            fastScrollSensitivity: 5,
            scrollSensitivity: 1
        };

        this.webPanel.webview.postMessage({ command: 'term-create', data: JSON.stringify(termOptions) })
            .then(() => {
                if (this.modul !== 'cmd') {
                    this.webPanel.webview.postMessage({ command: 'term-hide' })
                        .then(() => {
                            sendInitCmds.forEach((data: string) => {
                                //this.terminalInstance!.sendText(element);
                                // console.log(`sendInitCmds: ${data}`);
                                this._ptyProcess.write(data + '\r');
                            });
                        });
                } else {
                    sendInitCmds.forEach((data: string) => {
                        this._ptyProcess.write(data + '\r');
                    });
                }

            });



        // console.log(`terminalInstance: ${JSON.stringify(this.terminalInstance)}`);



    }

    private xtermWrite(data: string) {
        if (this.webPanel && this.webPanel.active) {
            if (this.lostFocus) {
                this.webPanel.webview.postMessage({ command: 'focus-back' });
                this.lostFocus = false;
            }
            this.emptyTermBuffer();
            this.webPanel.webview.postMessage({ command: 'term-write', data });
        } else {
            this.lostFocus = true;
            // vscode.window.showInformationMessage(`${this.panelCaption} webpanel is not active - term data to buffer`);
            this.termBuffer.unshift(data);
        }
    }

    private emptyTermBuffer() {

        while (this.termBuffer.length > 0) {
            let data = this.termBuffer.pop();
            this.webPanel.webview.postMessage({ command: 'term-write', data });
        }
    }




    private _getHtmlForWebview() {
        // const manifest = require(path.join(this.extensionPath, 'out', 'asset-manifest.json'));
        // const mainScript = 'index.js';
        // const mainStyle = 'index.css';

        const mainScript = 'dist/bundle.js';

        // stilovi vscode-xterm trebaju
        const xtermStyle = 'css/xterm.css';

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
        //const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
        const scriptUri = this.webPanel.webview.asWebviewUri(scriptPathOnDisk);
        /*
        const scriptReact1OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript1));
        const scriptReact1Uri = scriptReact1OnDisk.with({ scheme: 'vscode-resource' });

        const scriptReact2OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript2));
        const scriptReact2Uri = scriptReact2OnDisk.with({ scheme: 'vscode-resource' });
        */

        const xermStylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', xtermStyle));
        const xtermStyleUri = this.webPanel.webview.asWebviewUri(xermStylePathOnDisk);

        // const xermFullScreenStylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', xtermFullScreenStyle));
        // const xtermFullScreenStyleUri = xermFullScreenStylePathOnDisk.with({ scheme: 'vscode-resource' });

        const stylePathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', mainStyle));
        const styleUri = this.webPanel.webview.asWebviewUri(stylePathOnDisk);

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
				<meta http-equiv="Content-Security-Policy" content="default-src http://localhost:5000; media-src data: https: http:;img-src vscode-resource: https: http:; script-src 'unsafe-eval' 'nonce-${nonce}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
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

function shell(): string {
    if (Helper.is_windows()) {
        return vscode.workspace.getConfiguration('f18').get('winShell');
    } else {
        return '/bin/bash';
    }
}