import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('f18.start.pos', () => {
		F18Panel.createOrShow(context.extensionPath, 'pos', 'vindija_2018');
	
		
	}));

	context.subscriptions.push(vscode.commands.registerCommand('f18.start.fin', () => {
		F18Panel.createOrShow(context.extensionPath, 'fin', 'vindija_2018');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('f18.start.kalk', () => {
		F18Panel.createOrShow(context.extensionPath, 'kalk', 'vindija_2018');
	}));

}



class F18Panel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: F18Panel | undefined;

	private static readonly viewType = 'F18';
	private static panelNum = 1;

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];
	private terminal: vscode.Terminal;
	private readonly _modul: string;
	private readonly _organizacija: string;

	public static createOrShow(extensionPath: string, cModul: string, cOrganizacija: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		// if (F18Panel.currentPanel) { 
		//	F18Panel.currentPanel._panel.reveal(column);
		//} else {
			F18Panel.currentPanel = new F18Panel(cModul, cOrganizacija, extensionPath, column || vscode.ViewColumn.One);
			// vscode.workspace.textDocuments;
		//}

			
		// vscode.window.showInformationMessage(`${vscode.window.activeTextEditor}`);
		/*
		setTimeout(() => {
		   
			
		   vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
		   vscode.commands.executeCommand('workbench.action.nextEditor');
		   vscode.commands.executeCommand('workbench.action.previousEditor');
		}, 2000);
		*/

	}

	private constructor(cModul: string, cOrganizacija: string, extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		this._modul = cModul;
		this._organizacija = cOrganizacija;

		const currentPanelCaption = `F18 ${this._modul} - ${F18Panel.panelNum}`;
		F18Panel.panelNum++;

		this.terminal = vscode.window.createTerminal(currentPanelCaption);
		

		(<any> this.terminal).onDidWriteData((data: string) => {
			// console.log('onDidWriteData: ' + data);
			this.doTerminalWrite(data); 
		});

		this.terminal.show(true);
		this.terminal.hide();
		// this.terminal.sendText("stty cols 100 rows 40 ; cd /home/hernad/F18_knowhow ; ./F18.sh ");
		this.terminal.sendText(`stty cols 120 rows 40 ; cd /home/hernad/F18_knowhow ; ./F18.sh -h 127.0.0.1 -y 5432 -u hernad -p hernad -d ${this._organizacija} --${this._modul} ; exit`);

		
		vscode.window.onDidCloseTerminal( (terminal: vscode.Terminal) => {
			vscode.window.showInformationMessage(`onDidCloseTerminal, name: ${terminal.name}`);
			if ( terminal.name == this.terminal.name ) {
				this._panel.dispose();
			}
		});

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(F18Panel.viewType, currentPanelCaption, column, {
			// Enable javascript in the webview
			enableScripts: true,
			retainContextWhenHidden: true,
			
			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			],
			
		});

	
		// Set the webview's initial html content 
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'alert':
					vscode.window.showErrorMessage(message.data);
					return;
				case 'terminal-input':
					this.terminal.sendText(message.data, false);
					console.log(`terminal-input: ${message.data}`);
				    
			}
		}, null, this._disposables);

		
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public doTerminalWrite( data: string ) {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'terminal', data });
	}

	public dispose() {
		F18Panel.currentPanel = undefined;
		this.terminal.dispose();

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {
		// const manifest = require(path.join(this._extensionPath, 'out', 'asset-manifest.json'));
		// const mainScript = 'index.js';
		// const mainStyle = 'index.css';

		// app.5793fd45.js   app.5793fd45.map
		const mainScript = 'webpack/dist/bundle.js';

		const xtermStyle = 'webpack/node_modules/xterm/dist/xterm.css';
		const mainStyle = 'index.css';

		const reactScript1 = 'webpack/node_modules/react/umd/react.development.js';
		const reactScript2 = 'webpack/node_modules/react-dom/umd/react-dom.development.js';


		//<script src="./node_modules/react/umd/react.development.js"></script>
        //<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>


		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });

		const scriptReact1OnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', reactScript1));
		const scriptReact1Uri = scriptReact1OnDisk.with({ scheme: 'vscode-resource' });

		const scriptReact2OnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', reactScript2));
		const scriptReact2Uri = scriptReact2OnDisk.with({ scheme: 'vscode-resource' });

		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		const xermStylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', xtermStyle));
		const xtermStyleUri = xermStylePathOnDisk.with({ scheme: 'vscode-resource' });
		


		// Use a nonce to whitelist which scripts can bereact.development.js run
		const nonce = getNonce();


		const strHtml = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<link rel="stylesheet" type="text/css" href="${xtermStyleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src http://localhost:5000 https://w5xlvm3vzz.lp.gql.zone/graphql; img-src vscode-resource: https: http:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
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
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}