import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('F18 ekstenzija aktivna :)');

	context.subscriptions.push(
		vscode.commands.registerCommand('f18.start.pos', () => {
			F18Panel.createOrShow(context.extensionPath, 'pos', 'proba_2018');
		}),
		vscode.commands.registerCommand('f18.start.fin', () => {
			F18Panel.createOrShow(context.extensionPath, 'fin', 'proba_2018');
		}),
		vscode.commands.registerCommand('f18.start.kalk', () => {
			F18Panel.createOrShow(context.extensionPath, 'kalk', 'proba_2018');
		})
	);

	vscode.commands.executeCommand('workbench.action.toggleFullScreen');
	vscode.commands.executeCommand('workbench.action.closeAllEditors');
	// vscode.commands.executeCommand('f18.start.kalk');

	setTimeout(() => {
		const onStart = vscode.workspace.getConfiguration('f18').get('onStart');
		vscode.commands.executeCommand(`f18.start.${onStart}`);
	}, 700);

}

class F18Panel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: F18Panel | undefined;

	public static createOrShow(extensionPath: string, cModul: string, cOrganizacija: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		F18Panel.currentPanel = new F18Panel(cModul, cOrganizacija, extensionPath, column || vscode.ViewColumn.One);
	}

	private static readonly viewType = 'F18';
	private static panelNum = 1;

	private readonly panel: vscode.WebviewPanel;
	private readonly extensionPath: string;
	// private disposables: vscode.Disposable[] = [];

	private terminal: vscode.Terminal;
	private readonly modul: string;
	private readonly f18Organizacija: string;
	private readonly panelNum: number;

	private constructor(cModul: string, cOrganizacija: string, extensionPath: string, column: vscode.ViewColumn) {
		this.extensionPath = extensionPath;

		this.modul = cModul;
		this.f18Organizacija = cOrganizacija;

		this.panelNum = F18Panel.panelNum;
		const currentPanelCaption = `F18 ${this.modul} - ${this.panelNum}`;
		F18Panel.panelNum++;

		this.panel = vscode.window.createWebviewPanel(F18Panel.viewType, currentPanelCaption, column, {
			enableScripts: true, // Enable javascript in the webview
			retainContextWhenHidden: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this.extensionPath, 'cli')),
				vscode.Uri.file(path.join(this.extensionPath, 'build'))
			]
		});
		this.panel.webview.html = this._getHtmlForWebview();

		this.terminal = vscode.window.createTerminal(currentPanelCaption);
		this.terminal.processId.then(
			(processId) => { 
				// vscode.window.showInformationMessage( `kreiran terminal ${processId}`); 
				this.setupTerminal();
			},
			() => vscode.window.showErrorMessage('terminal se ne može kreirati?!')
		);
		

	}


	public setupTerminal() {

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this.panel.onDidDispose(() => this.dispose());

		// Handle messages from the webview
		this.panel.webview.onDidReceiveMessage(
			(message: any) => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.data);
						return;
					// case 'terminal-cmd':
						// if (this.terminal) this.terminal.sendText(message.data);
						return;
					case 'terminal-input':
					    if (this.terminal) this.terminal.sendText(message.data, false);
					    // console.log(`terminal-input: ${message.data}`);
				}
			}
		);

		(this.terminal as any).onDidWriteData((data: string) => {
			// console.log('onDidWriteData: ' + data);
			this.doTerminalWrite(data);
		});
		// kad nema this.terminal.show [uncaught exception]: TypeError: Cannot read property 'classList' of undefined
		this.terminal.show(true);
		this.terminal.hide();

		let sendInitCmds: string;

		if (is_windows()) {
			// vscode.window.showInformationMessage(`run cd ${this.extensionPath}\\win32 & F18.exe & exit`);
			// this.terminal.sendText(`mode con: cols=120 lines=40 & cd ${this.extensionPath}\exe & F18.exe 2>F18.err.log -h 192.168.124.1 -y 5432 -u hernad -p hernad -d ${this.f18Organizacija} --${this.modul} & exit`);
			//this.terminal.sendText(
			sendInitCmds = `mode con: cols=120 lines=40 & cd ${this.extensionPath}\\win32 & F18.exe 2>${this.modul}_${this
					.panelNum}.log -h 192.168.124.1 -y 5432 -u hernad -p hernad -d ${this.f18Organizacija} --${this
					.modul} & exit`
			//);
		} else {
			// vscode.window.showInformationMessage(`run cd ${this.extensionPath}\\linux ; F18`);
			// this.terminal.sendText(
			sendInitCmds = `stty cols 120 rows 40 ; cd ${this.extensionPath}/linux ; ./F18 2>${this.modul}_${this
					.panelNum}.log -h 192.168.124.1 -y 5432 -u hernad -p hernad -d ${this.f18Organizacija} --${this
					.modul} ; exit`
			// );
		}

		vscode.window.onDidCloseTerminal((terminal: vscode.Terminal) => {
			// vscode.window.showInformationMessage(`onDidCloseTerminal, name: ${terminal.name}`);
			if (this.terminal && terminal.name == this.terminal.name) {
				this.panel.dispose();
			}
		});

		const termOptions = {
			cols: 120,
			rows: 40,
			cursorBlink: true,
			// bellStyle: 'sound',
			// cursorStyel: 'block',
			//rendererType: 'canvas',
			// renderType: 'dom',
			fontFamily: "'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
			
			//fontSize: 12,
			//letterSpacing: 0,
			//lineHeight: 0.99
			
			fontSize: 14,
			letterSpacing: 0,
			lineHeight: 0.90
		};
		this.panel.webview.postMessage({ command: 'term-create', data: JSON.stringify(termOptions) });
		// this.panel.webview.postMessage({ command: 'term-cmd', data: sendInitCmds });

		this.terminal.sendText(sendInitCmds);
	}


	public dispose() {

		F18Panel.currentPanel = undefined;
		if (this.terminal) this.terminal.dispose();

		// Clean up our resources
		this.panel.dispose();

		// while (this.disposables.length) {
		// 	const x = this.disposables.pop();
		// 	if (x) {
		// 		x.dispose();
		// 	}
		// }
		
	}



	public doTerminalWrite(data: string) {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this.panel.webview.postMessage({ command: 'term-write', data });
	}

	

	private _getHtmlForWebview() {
		// const manifest = require(path.join(this.extensionPath, 'out', 'asset-manifest.json'));
		// const mainScript = 'index.js';
		// const mainStyle = 'index.css';

		// app.5793fd45.js   app.5793fd45.map
		const mainScript = 'dist/bundle.js';

		const xtermStyle = 'node_modules/vscode-xterm/lib/xterm.css';
		// const xtermFullScreenStyle = 'node_modules/xterm/dist/addons/fullscreen/fullscreen.css';
		const mainStyle = 'index.css';

		// const mode = 'development';
		const mode = 'production.min';

		const reactScript1 = `node_modules/react/umd/react.${mode}.js`;
		const reactScript2 = `node_modules/react-dom/umd/react-dom.${mode}.js`;

		//<script src="./node_modules/react/umd/react.development.js"></script>
		//<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

		const scriptPathOnDisk = vscode.Uri.file(path.join(this.extensionPath, 'build', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });

		const scriptReact1OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript1));
		const scriptReact1Uri = scriptReact1OnDisk.with({ scheme: 'vscode-resource' });

		const scriptReact2OnDisk = vscode.Uri.file(path.join(this.extensionPath, 'cli', reactScript2));
		const scriptReact2Uri = scriptReact2OnDisk.with({ scheme: 'vscode-resource' });

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
				<meta http-equiv="Content-Security-Policy" content="default-src http://localhost:5000 https://w5xlvm3vzz.lp.gql.zone/graphql; img-src vscode-resource: https: http:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(this.extensionPath).with({ scheme: 'vscode-resource' })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				<div id="example"></div>
				<script nonce="${nonce}" src="${scriptReact1Uri}"></script>
				<script nonce="${nonce}" src="${scriptReact2Uri}"></script>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
		// console.log(strHtml);
		return strHtml;
	}
}

function getNonce() {
	let text = '';
	const possible = 'AF18DEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012ea890';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function is_windows() {
	return process.platform === 'win32';
}
