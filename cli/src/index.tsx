

/// <reference path="../node_modules/xterm/typings/xterm.d.ts"/>

//import { Terminal } from 'vscode-xterm/lib/public/Terminal';
import { Terminal } from 'xterm';
import { MyWebLinksAddon } from './MyWebLinksAddon';

// import * as attach from 'xterm/lib/addons/attach/attach';
// import * as fit from 'xterm/lib/addons/fit/fit';
// import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
// import * as search from 'xterm/lib/addons/search/search';
//import * as webLinks from 'vscode-xterm/lib/addons/webLinks/webLinks';
//import * as winptyCompat from 'vscode-xterm/lib/addons/winptyCompat/winptyCompat';

// import { WebLinksAddon } from 'xterm-addon-web-links';
//import { WinptyCompat } from 'xterm/lib/addons/winptyCompat/winptyCompat';


// import { ISearchOptions } from 'xterm/lib/addons/search/Interfaces';
// import { Terminal as TerminalType } from 'vscode-xterm';

// import * as fit from 'xterm/lib/addons/fit/fit';

// Enable xterm.js addons
// @ts-ignore
// import * as search from 'vscode-xterm/lib/addons/search/search';
// import * as webLinks from 'vscode-xterm/lib/addons/webLinks/webLinks';


// @ts-ignore
const vscode = acquireVsCodeApi();

// https://xtermjs.org/docs/api/addons/attach/
// Terminal.applyAddon(attach);
// Terminal.applyAddon(fit);
// https://xtermjs.org/docs/api/addons/fullscreen/
// Terminal.applyAddon(fullscreen);
// Terminal.applyAddon(search);

// const terminal = new Terminal();
// Load WebLinksAddon on terminal, this is all that's needed to get web links
// working in the terminal.
//terminal.loadAddon(new WinptyCompat());


//Terminal.applyAddon(webLinks);
//Terminal.applyAddon(winptyCompat);
//Terminal.applyAddon(attach);

let term: any;
let termOptions: any;
let config: any;



if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', (event) => {
		if (!vscode.postMessage) console.log('postMessage error 0');
		vscode.postMessage({
			command: 'ready'
		});
		console.log('document loaded - post msg ready');
	});
}

if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', (event) => {
		if (!vscode.postMessage) console.log('postMessage error 0');
		vscode.postMessage({
			command: 'ready'
		});
		console.log('document loaded - post msg ready');
	});
}

/*
var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window,
		clientX: 10,
        clientY: 10
	});
	// If cancelled, don't dispatch our event
	//var canceled = !elem.dispatchEvent(evt);
	elem.dispatchEvent(evt);


};
*/

/*
function simulateKey (keyCode, type, modifiers) {
	var evtName = (typeof(type) === "string") ? "key" + type : "keydown";
	var modifier = (typeof(modifiers) === "object") ? modifier : {};

	var event = document.createEvent("HTMLEvents");
	event.initEvent(evtName, true, false);
	// @ts-ignore
	event.keyCode = keyCode;

	for (var i in modifiers) {
		event[i] = modifiers[i];
	}

	document.dispatchEvent(event);
}
*/

// https://gist.github.com/ejoubaud/7d7c57cda1c10a4fae8c
// https://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key/10520017#10520017


function keyGen(k) {
	var oEvent = document.createEvent('KeyboardEvent');

	// Chromium Hack
	Object.defineProperty(oEvent, 'keyCode', {
		get: function () {
			return this.keyCodeVal;
		}
	});
	Object.defineProperty(oEvent, 'which', {
		get: function () {
			return this.keyCodeVal;
		}
	});

	//if (oEvent.initKeyboardEvent) {
	oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, k, k, "", false, "");
	//} else {
	//   oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
	//}

	// @ts-ignore
	oEvent.keyCodeVal = k;

	if (oEvent.keyCode !== k) {
		alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	}

	//document.body.dispatchEvent(oEvent);
	document.activeElement.dispatchEvent(oEvent);
}

function handleVisibilityChange() {
	if (document["hidden"]) {
		console.log('bluram');
	} else {
		console.log('focusam');
		vscode.postMessage({
			command: 'cli-focus'
		});

		//term.textarea.style.opacity='0.2';
		const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
		xtermScreen.style.opacity = '0.5';
		//alert('update-cli');
		setTimeout(() => {
			xtermScreen.style.opacity = '1.0';
		}, 500);

		/*
        keyGen(9);
		keyGen(9);
		keyGen(9);
		keyGen(9);
		keyGen(9);
		keyGen(9);
		*/

		//const keyEvent = new KeyboardEvent("keydown", {keyCode : String.fromCharCode(9) });

		//document.dispatchEvent(keyEvent);

		/*
		const evt = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
			clientX: 20,
		}),
		ele = document.getElementById('terminal');
		ele.dispatchEvent(evt);
		*/

		/*
		//var someLink = document.getElementById('terminal');
		simulateClick(document.getElementById('google'));

        document.getElementById("google").addEventListener("click", () => {
		    term.textarea.focus();
		});

		document.getElementById("google").addEventListener("keydown", () => {
			term.textarea.focus();
		});

		document.getElementById("input1").addEventListener("keydown", () => {
			term.textarea.focus();
		});
		*/

		//term.textarea.dispatchEvent(new KeyboardEvent('keypress',{'key':'1'}));

		//document.getElementById('terminal').focus();

		//term.textarea.focus();
		//vscode.postMessage({
		//	command: "cli-focus"
		//});
		//const terminalElement = document.getElementById('terminal');
		//terminalElement.style.display = 'block';

		//const headerWithWrapper = document.createElement('div');
		//headerWithWrapper.innerHTML = '<input type="text" id="input1" minlength="4" maxlength="8" size="10">';

		//const container = document.getElementById('root');
		//document.getElementById('terminal').remove();
		//container.appendChild(headerWithWrapper);

		//document.getElementById('input1').focus();


		//term.focus();

		//const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
		//xtermScreen.style.width = '50%';
		//xtermScreen.style.height = '50%';


		//term.showCursor();
		//term.emit('resize', { cols: 30, rows: 15 });

		/*
		let el;
		for (let i = 0; i < 20; i++) {
			simulateKey(9, "press", undefined);
			el = document.activeElement;
			console.log(`${i} ${el.className}`);
	        if (el.className === 'xterm-helper-textarea') {
				i=20;
			} else {
				//if (el.nextElementSibling) {
				//	el = el.nextElementSibling;
				//	// @ts-ignore
				//	el.focus();
				//	console.log('focus');
				//} else {
				//	console.log('no sibling?');
				//}
			}
		}
		*/


		//const xtermTextArea = document.getElementsByClassName("xterm-helper-textarea").item(0) as HTMLElement;
		//xtermTextArea.focus();


	}
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

			const isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator.platform) >= 0;
			term = new Terminal({ ...termOptions, windowsMode: isWindows });
			//term.loadAddon(new MyWebLinksAddon());
			//term.winptyCompatInit();

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
					vscode.postMessage({
						command: 'term-show'
					});

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
			//term.winptyCompatInit();
			// term.webLinksInit();


			//term.on('focus', () => {
			//	// console.log( `xterm  ${term.getOption('termName')} ima focus rows: ${term.cols} cols: ${term.rows}`);
			//	// console.log( `xterm ${term.getOption('termName')}: ${headerWithWrapper.clientWidth} ${headerWithWrapper.clientHeight}`);
			//
			//	//const computedStyle = window.getComputedStyle( iframe.width);
			//	// const width = parseInt(computedStyle.getPropertyValue('width').replace('px', ''), 10);
			//	// const height = parseInt(computedStyle.getPropertyValue('height').replace('px', ''), 10);
			//
			//	// term.element.click();
			//	// console.log('term on focus');
			//
			//	if (!vscode.postMessage) console.log('postMessage error 2');
			//	vscode.postMessage({
			//		command: 'cli-focus'
			//	});
			//});

			term.onTitleChange((title: string) => {
				// console.log(`xterm title: ${title}`);
			});


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

			const xtermScreen = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
			xtermScreen.style.width = '1%';
			xtermScreen.style.height = '1%';

			break;

		case 'term-show':
		case 'focus-back':

			const xtermScreen2 = document.getElementsByClassName("xterm-text-layer").item(0) as HTMLElement;
			xtermScreen2.style.width = '100%';
			xtermScreen2.style.height = '100%';
			//vscode.postMessage({
			//	command: 'cli-input',
			//	data: '\x1b[24~' // K_F12
			//});


			//if (term) term.focus();
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
		console.log(`rendererType: ${this.config.rendererType}`);
		if (this.config.rendererType === 'dom') {
			scaledCharWidth = font.charWidth * window.devicePixelRatio;
			scaledLineHeight = Math.floor(scaledCharHeight);
		} else {
			scaledCharWidth = Math.floor(font.charWidth * window.devicePixelRatio) + font.letterSpacing;
			scaledLineHeight = Math.floor(scaledCharHeight * font.lineHeight);
		};

		const cols = Math.max(Math.floor(scaledWidthAvailable / scaledCharWidth), 1);
		const rows = Math.max(Math.floor(scaledHeightAvailable / scaledLineHeight), 1);

		return { rows, cols };
	}
}
