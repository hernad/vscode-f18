
/// <reference path="../node_modules/xterm/typings/xterm.d.ts"/>


import { Terminal } from 'xterm';
import { WebglAddon } from 'xterm-addon-webgl';

//import { MyWebLinksAddon } from './MyWebLinksAddon';



// @ts-ignore
const vscode = acquireVsCodeApi();


let term: any;
let termOptions: any;
let config: any;


if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', (event) => {
		if (!vscode.postMessage) console.log('postMessage error 0');
		vscode.postMessage({
			command: 'ready'
		});
		// console.log('document loaded - post msg ready');
	});
}

function handleVisibilityChange() {
	if (document["hidden"]) {
		console.log('bluram');
	} else {
		console.log('focusam');
		vscode.postMessage({
			command: 'cli-focus'
		});


		const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;

		if (xtermScreen)
			xtermScreen.style.opacity = '0.5';

		setTimeout(() => {
			if (xtermScreen)
				xtermScreen.style.opacity = '1.0';
		}, 500);



	}
}


function termShow() {
	const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
	if (xtermScreen) {
		xtermScreen.style.width = '100%';
		xtermScreen.style.height = '100%';
	}
	//vscode.postMessage({
	//	command: 'cli-input',
	//	data: '\x1b[24~' // K_F12
	//});

	//if (term) term.focus();
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);


//window.addEventListener('pageshow', (event) => {
// console.log('window pageshow');
//});

window.addEventListener('message', (event) => {
	const message = (event as any).data; // The JSON data our extension sent

	//if (!vscode.postMessage)

	switch (message.command) {

		case 'ping':
			console.log('dosao ping :)');
			if (!vscode.postMessage) console.log('postMessage error 5');
			vscode.postMessage({
				command: 'pong'
			});
			break;

		case 'term-get-dimensions':
			try {
				config = JSON.parse(message.data);
			} catch {
				console.log(`message data get-dimensions error ${message.data}`);
				vscode.postMessage({
					command: 'dimensions-error',
					data: message.data
				});
			}
			const html = document.body.parentElement;
			const fm = new FontMeasurer(config, document.body);

			const rowsCols = fm.evaluateColsAndRows(html.clientWidth, html.clientHeight);

			const data = JSON.stringify({
				width: html.clientWidth,
				height: html.clientHeight,
				rows: rowsCols.rows,
				cols: rowsCols.cols
				//charWidth: measure.charWidth,
				//charHeight: measure.charHeight
			});

			console.log(`cli-dimensions: ${data}`);
			if (!vscode.postMessage) console.log('postMessage error 6');
			vscode.postMessage({
				command: 'cli-dimensions',
				data
			});

			break;

		case 'term-create':
			// console.log('message: term-create');
			const headerWithWrapper = document.createElement('div');

			//headerWithWrapper.innerHTML = '<div id="terminal" class="terminal-wrapper"></div><a id="google" href="#input1">termin</a><input type="text" id="input1" minlength="4" maxlength="8" size="10">';
			headerWithWrapper.innerHTML = '<div id="terminal" class="terminal-wrapper"></div>';

			const container = document.getElementById('root');
			container.appendChild(headerWithWrapper);
			const terminalElement = document.getElementById('terminal');

			termOptions = JSON.parse(message.data);
			const webGL = termOptions.webGL;

			const isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator.platform) >= 0;
			// console.log(`termOptions: ${JSON.stringify({ ...termOptions, "windowsMode": isWindows })}`);
			term = new Terminal({ ...termOptions, "windowsMode": isWindows });


			// hvata sve evente - i keystrokes i mouse evente
			term.onData((data: string) => {
				// console.log(`cli-input: ${data}`);
				if (!vscode.postMessage) console.log('postMessage error 1');
				vscode.postMessage({
					command: 'cli-input',
					data
				});
			});

			term.onTitleChange((data: string) => {

				const regexVsCodeCmd = new RegExp("\\[vscode#(\\S+)\\](.*)\\[vscode#end\\]");
				const match = data.match(regexVsCodeCmd);

				if (!match) {
					return;
				}

				if (match[1] == 'f18.klijent' && match[2] == 'start') {
					// F18 klijent: f18.klijent - start
					termShow();

				} else if (match[1] == 'pdf.view') {

					// match[1] - pdf.view, match[2] - cFile
					const fileName = match[2];
					vscode.postMessage({
						command: 'pdf-view',
						data: fileName
					})
				}

			});

			//term._core.register(term.addDisposableListener('paste', (data, ev) => {
			//	term.write(data);
			//}));

			/*
			document.getElementById('btn_k_f5').onclick = (event: any) => {
				vscode.postMessage({
					command: 'cli-input',
					data: '\x1b[15~' // K_F5
				});
				term.focus();
			};
			document.getElementById('btn_k_f8').onclick = (event: any) => {
				vscode.postMessage({
					command: 'cli-input',
					data: '\x1b[18~' // K_F8
				});
				term.focus();
			};
			document.getElementById('btn_k_ins').onclick = (event: any) => {
				vscode.postMessage({
					command: 'cli-input',
					data: '\x1b[2~' // INS
				});
				term.focus();
			};
			*/

			term.open(terminalElement);
			if (webGL) {				
			    console.log('webGL YES');
				// term.setOption('minimumContrastRatio', 10);
				term.loadAddon(new WebglAddon());
			} else {
				console.log('webGL NO!');
			}

			if (!term) {
				if (!vscode.postMessage) console.log('postMessage error 3');
				vscode.postMessage({
					command: 'quit',
					data: "Term objekat error?!"
				});
			} else {
				term.focus();
				/*
				let el = document.activeElement;
		        let clses = '';
		        el.classList.forEach( (cls) => {
			        clses += ";" + cls;
		        });
				console.log(`${el.id} ${el.className} - ${clses}`);
				*/
				// xterm-helper-textarea
			}
			break;

		case 'term-write':
			if (term) term.write(message.data);
			break;


		case 'term-hide':

			/*
				const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
				if (xtermScreen) {
					xtermScreen.style.width = '1%';
					xtermScreen.style.height = '1%';
				}
	        */
			break;

		case 'term-show':
		case 'focus-back':

			termShow();
			break;

	}
});

// (document.getElementsByClassName("xterm-helpers").item(0) as HTMLDivElement).style.visibility = "hidden";;
// (document.getElementsByClassName("xterm-helper-textarea").item(0) as HTMLDivElement).style.display = 'none';
//(document.getElementsByClassName("xterm-char-measure-element").item(0) as HTMLDivElement).style.display = 'none';


// ReactDOM.render(<App />, document.getElementById("example"));

interface ITerminalFont {
	fontFamily: string;
	fontSize: number;
	letterSpacing: number;
	lineHeight: number;
	charWidth?: number;
	charHeight?: number;
}

/*

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export interface ITerminalConfiguration {
	shell: {
		linux: string;
		osx: string;
		windows: string;
	};
	shellArgs: {
		linux: string[];
		osx: string[];
		windows: string[];
	};
	macOptionIsMeta: boolean;
	macOptionClickForcesSelection: boolean;
	rendererType: 'auto' | 'canvas' | 'dom';
	rightClickBehavior: 'default' | 'copyPaste' | 'selectWord';
	cursorBlinking: boolean;
	cursorStyle: string;
	drawBoldTextInBrightColors: boolean;
	fontFamily: string;
	fontWeight: FontWeight;
	fontWeightBold: FontWeight;
	// fontLigatures: boolean;
	fontSize: number;
	letterSpacing: number;
	lineHeight: number;
	setLocaleVariables: boolean;
	scrollback: number;
	commandsToSkipShell: string[];
	cwd: string;
	confirmOnExit: boolean;
	enableBell: boolean;
	env: {
		linux: { [key: string]: string };
		osx: { [key: string]: string };
		windows: { [key: string]: string };
	};
	showExitAlert: boolean;
	experimentalBufferImpl: 'JsArray' | 'TypedArray';
	splitCwd: 'workspaceRoot' | 'initial' | 'inherited';
	windowsEnableConpty: boolean;
}
*/

class Dimension {
	public width: number;
	public height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	static equals(a: Dimension | undefined, b: Dimension | undefined): boolean {
		if (a === b) {
			return true;
		}
		if (!a || !b) {
			return false;
		}
		return a.width === b.width && a.height === b.height;
	}
}
class FontMeasurer {
	private _charMeasureElement?: HTMLElement;
	private _container: HTMLElement;
	private _lastFontMeasurement?: ITerminalFont;
	// public config?: ITerminalConfiguration;
	public config: any;

	public constructor(config: any, container: HTMLElement) {
		this._container = container;
		this._createCharMeasureElementIfNecessary();

		//fontFamily: string

		//this.config = this._configurationService.getValue<ITerminalConfiguration>(TERMINAL_CONFIG_SECTION);

		this.config = config;

		//const fontFamily = this.config.fontFamily || this._configurationService.getValue<IEditorOptions>('editor').fontFamily || EDITOR_FONT_DEFAULTS.fontFamily;
		//this.config.fontFamily = fontFamily;
	}

	private _createCharMeasureElementIfNecessary() {
		// Create charMeasureElement if it hasn't been created or if it was orphaned by its parent
		if (!this._charMeasureElement || !this._charMeasureElement.parentElement) {
			this._charMeasureElement = document.createElement('div');
			this._container.appendChild(this._charMeasureElement);
		}
	}

	public configFontIsMonospace(): boolean {
		const fontSize = 15;

		const i_rect = this._getBoundingRectFor('i', this.config.fontFamily, fontSize);
		const w_rect = this._getBoundingRectFor('w', this.config.fontFamily, fontSize);

		const invalidBounds = !i_rect.width || !w_rect.width;
		if (invalidBounds) {
			// There is no reason to believe the font is not Monospace.
			return true;
		}
		return i_rect.width === w_rect.width;
	}

	private _getBoundingRectFor(char: string, fontFamily: string, fontSize: number): ClientRect | DOMRect {
		const style = this._charMeasureElement!.style;
		style.display = 'inline-block';
		style.fontFamily = fontFamily;
		style.fontSize = fontSize + 'px';
		style.lineHeight = 'normal';
		this._charMeasureElement!.innerText = char;
		const rect = this._charMeasureElement!.getBoundingClientRect();
		style.display = 'none';

		return rect;
	}

	public measureFont(): ITerminalFont {
		this._createCharMeasureElementIfNecessary();

		const fontSize = this.config.fontSize;
		const letterSpacing = this.config.letterSpacing;
		const lineHeight = this.config.lineHeight;

		const rect = this._getBoundingRectFor('X', this.config.fontFamily, fontSize);

		// Bounding client rect was invalid, use last font measurement if available.
		if (this._lastFontMeasurement && !rect.width && !rect.height) {
			return this._lastFontMeasurement;
		}

		this._lastFontMeasurement = {
			fontFamily: this.config.fontFamily,
			fontSize,
			letterSpacing,
			lineHeight,
			charWidth: rect.width,
			charHeight: Math.ceil(rect.height)
		};
		return this._lastFontMeasurement;
	}

	public evaluateColsAndRows(width: number, height: number): { rows: number, cols: number } {
		// Ignore if dimensions are undefined or 0
		if (!width || !height) {
			return null;
		}

		const dimension = new Dimension(width, height);
		if (!dimension) {
			return null;
		}

		const font = this.measureFont();
		if (!font.charWidth || !font.charHeight) {
			return null;
		}

		// Because xterm.js converts from CSS pixels to actual pixels through
		// the use of canvas, window.devicePixelRatio needs to be used here in
		// order to be precise. font.charWidth/charHeight alone as insufficient
		// when window.devicePixelRatio changes.
		const scaledWidthAvailable = dimension.width * window.devicePixelRatio;
		const scaledHeightAvailable = dimension.height * window.devicePixelRatio;
		const scaledCharHeight = Math.ceil(font.charHeight * window.devicePixelRatio);

		let scaledCharWidth: number;
		let scaledLineHeight: number;
		// console.log(`rendererType: ${this.config.rendererType}`);
		//if (this.config.rendererType === 'dom') {
		//	scaledCharWidth = font.charWidth * window.devicePixelRatio;
		//	scaledLineHeight = Math.floor(scaledCharHeight);
		//} else {
		scaledCharWidth = Math.floor(font.charWidth * window.devicePixelRatio) + font.letterSpacing;
		scaledLineHeight = Math.floor(scaledCharHeight * font.lineHeight);
		//};

		const cols = Math.max(Math.floor(scaledWidthAvailable / scaledCharWidth), 1);
		const rows = Math.max(Math.floor(scaledHeightAvailable / scaledLineHeight), 1);

		return { rows, cols };
	}
}
