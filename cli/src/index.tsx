/*
hernad: react-out
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';
import MyButton from './components/MyButton';
import MySection from './components/MySection';

class MyCompoment extends React.Component {
	public render() {
		return (
			<section>
				<h1>my component</h1>
				<p>content in my comp</p>
				<footer>
					<small>&copy; hernad 2018</small>
				</footer>
				<button>BTN</button>
			</section>
		);
	}
}
*/

/*
const numbers = [1, 2, 3];
for (const num of numbers) {
    console.log(num);
}
*/

/*
const propDugmeNaslov = 'P2 Dugme from Var';
const myThirdElement = <MySection.Third ptext={propDugmeNaslov} />;

interface IMyContainerState {
	items: string[];
}
type TResoveFn = (items: IMyContainerState) => void;

const resolveFn = (resolve: TResoveFn) => {
	setTimeout(() => {
		const posaljiItems: IMyContainerState = { items: [ 'First', 'Second', 'Third', 'pet' ] };
		resolve(posaljiItems);
	}, 2000);
};

function fetchData() {
	return new Promise(resolveFn);
}

import reverse from './reverse';

class MyContainer extends React.Component<{}, IMyContainerState> {
	public state: IMyContainerState = {
		items: [ 'nula' ]
	};

	public onClick = reverse.bind(this);

	// After the component has been rendered, make the
	// call to fetch the component data, and change the
	// state when the data arrives.
	public componentDidMount() {
		fetchData().then((value) => {
			const fetchedItems = value.items;
			this.setState({ items: [ ...this.state.items, ...fetchedItems ] } as IMyContainerState);
		});
	}

	public render() {
		return (
			<React.Fragment>
				<MySection.MyList {...this.state} />
				<button onClick={this.onClick}>REVERSE</button>
			</React.Fragment>
		);
	}
}
*/


/*
import { PermissionProvider } from './components/PermissionContext';

const myCompInstance = ReactDOM.render(
	<div>
		<PermissionProvider>
			<MyContainer />
			<MySection.MyList items={[ 'AAA', 'BBB' ]} />
			<MySection>
				<button>btn 1</button>
				<p />
				<button>btn 2</button>
			</MySection>
			<MyButton>
				<label>vako nako</label>
				<p />
				<label>novi label</label>
				<ul>
					<li>item 1</li>
					<li>item 2</li>
				</ul>
			</MyButton>
		</PermissionProvider>
	</div>,
	document.getElementById('example')
);
*/

/*
import MyFeature from './components/MyFeature';
ReactDOM.render(<MyFeature />, document.getElementById('example'));
*/

/*
import InheritedComponent from './components/InheritedComponent';
ReactDOM.render(<InheritedComponent />, document.getElementById('example'));
*/

// import App from './components/BootApp';
// import 'bootstrap/dist/css/bootstrap.css';
// import './components/BootApp.css';

/*
hernad: apollo-out
import ApolloClient from 'apollo-boost';

import Forms from './components/BootForms';
import Lists from './components/BootLists';

const client = new ApolloClient({
	// uri: 'http://localhost:5000/graphql'
	uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
});

import gql from 'graphql-tag';
*/

/*
ReactDOM.render(
	<ul>
	   <li>loading....</li>
	</ul>, document.getElementById('example'));
*/

/*
client.query({
	query: gql`
	{
      allKontos{
        nodes {
          id
          naz
        }
      }
	  allRobas{
        nodes {
          id
          naz
        }
      }
	}
    `
  })
  .then(result => {
	const nodesK = (result as any).data.allKontos.nodes;
	const nodesR = (result as any).data.allRobas.nodes;
	console.log(nodesK);
	const kontaElement = Object.keys(nodesK).map(key =>
	    <li key={key}>id={nodesK[key].id} naz={nodesK[key].naz}
	     <p/>
		 <input value={nodesK[key].naz} size={100} />
		</li>);
	const robaElement = Object.keys(nodesR).map(key => <li key={key}>id={nodesR[key].id} naz={nodesR[key].naz}</li>);
	ReactDOM.render(
		<ul>
		   {kontaElement}
		   <button>======================================================================</button>
		   {robaElement}
		</ul>, document.getElementById('example'));

   });
//  .then(result => console.log((result as any).data.allKontos.nodes));
*/

/*
hernad: react-bootstrap out
import { Navbar, Nav, NavItem, MenuItem, Grid, Row, Col } from 'react-bootstrap';
*/

/*
ReactDOM.render(
  <Navbar className="navbar-top" fluid={true}>
     <Forms/>,
	 <Lists/>,
	 <ul>
        {Object.keys(konta).map(key => <li key={key}>key={key} val={(konta as any)[key]}</li>)}
     </ul>
  </Navbar>, document.getElementById('example'));
*/

// const domInstance = ReactDOM.findDOMNode(myCompInstance);

/* 
hernad: react-out
import { ApolloProvider } from 'react-apollo';
*/


/// <reference path="../node_modules/vscode-xterm/typings/xterm.d.ts"/>

import { Terminal } from 'vscode-xterm/lib/public/Terminal';
// import * as attach from 'xterm/lib/addons/attach/attach';
// import * as fit from 'xterm/lib/addons/fit/fit';
// import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
// import * as search from 'xterm/lib/addons/search/search';
import * as webLinks from 'vscode-xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'vscode-xterm/lib/addons/winptyCompat/winptyCompat';
// import { ISearchOptions } from 'xterm/lib/addons/search/Interfaces';
// import { Terminal as TerminalType } from 'vscode-xterm';

// import * as fit from 'xterm/lib/addons/fit/fit';

// Enable xterm.js addons
// @ts-ignore
// import * as search from 'vscode-xterm/lib/addons/search/search';
// import * as webLinks from 'vscode-xterm/lib/addons/webLinks/webLinks';

// import { Query } from 'react-apollo';
// import { notDeepEqual } from 'assert';
// import gql from "graphql-tag";

/* hernad: apollo graphql out"
const ExchangeRates = () => (
	<Query
		query={gql`
			{
				rates(currency: "EUR") {
					currency
					rate
				}
			}
		`}
	>
		{({ loading, error, data }) => {
			if (loading) {
				return <p>Učitavam...</p>;
			}
			if (error) {
				return <p>Greška</p>;
			}

			return data.rates.map(({ currency, rate }) => (
				<div key={currency}>
					<p>{`${currency}: ${rate}`}</p>
				</div>
			));
		}}
	</Query>
);

const App = () => (
	<ApolloProvider client={client}>
		<div>
			<h2>First Apollo app 🚀</h2>
			<ExchangeRates />
		</div>
	</ApolloProvider>
);
*/

// @ts-ignore
const vscode = acquireVsCodeApi();

// https://xtermjs.org/docs/api/addons/attach/
// Terminal.applyAddon(attach);
// Terminal.applyAddon(fit);
// https://xtermjs.org/docs/api/addons/fullscreen/
// Terminal.applyAddon(fullscreen);
// Terminal.applyAddon(search);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

let term: any;
let config: any;

if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', (event) => {
		// console.log('document loaded');
	});
}

window.addEventListener('focus', (event) => {
	// console.log(`window focus ${window.screen.width} ${window.screen.height} ${document.body.children.length} ${document.body.children[0].className} ${document.body.children[1]} ${document.body.children[2]} ${document.body.children[3]}}}`);
	// const xterm = document.getElementsByClassName("xterm-screen").item(0) as HTMLDivElement
	// term ? term.focus() : console.log('term element nije definisan?!');
	// vscode.postMessage({
	//	command: 'cli-set-focus'
	// });
	// const mainContainer = document.getElementById('workbench.main.container');
	// console.log(`maincontainer ${mainContainer}`);
	// mainContainer.style.visibility = "hidden";
	// canvas
	// const xtermTextLayer = document.getElementsByClassName("xterm-helper-textarea").item(0) as HTMLDivElement; //.style.display = 'none';
	// if (xtermTextLayer) xtermTextLayer.focus();
	// dom
	// const xtermScreen = document.getElementsByClassName("xterm-screen").item(0) as HTMLDivElement; //.style.display = 'none';
	// xtermScreen ? xtermScreen.focus() : console.log('xterm-screen nema !?');
	// #terminal > div > div.xterm-screen > div > textarea
	// <textarea class="xterm-helper-textarea" aria-label="Terminal input" aria-multiline="false" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0"></textarea>
	// term ? term.viewport.viewportElement.click() : console.log('no term element');
	//if (term) {
	// term.focus();
	// const btn =	document.getElementById('btn_k_ins')
	// if (btn) btn.click();
	//}
});

window.addEventListener('pageshow', (event) => {
	// console.log('window pageshow');
});

window.addEventListener('message', (event) => {
	const message = (event as any).data; // The JSON data our extension sent

	//if (!vscode.postMessage)

	switch (message.command) {
		case 'ping':
		    console.log('dosao ping :)');
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

			vscode.postMessage({
				command: 'cli-dimensions',
				data
			});
			console.log(`${data}`);
			break;

		case 'term-create':
			// console.log('message: term-create');
			const headerWithWrapper = document.createElement('div');
			// headerWithWrapper.classList.add('terminal-wrapper');
			/*
			headerWithWrapper.innerHTML =
				'Komande: <button id="btn_k_f5">F5</button>  <button id="btn_k_f8">F8</button>  <button id="btn_k_ins">INS/OVER</button> <div id="terminal" class="terminal-wrapper"></div>';
			*/

			headerWithWrapper.innerHTML = '<div id="terminal" class="terminal-wrapper"></div>';

			//const xtermElement = document.createElement('div');
			const container = document.getElementById('root');
			//.appendChild(xtermElement);
			container.appendChild(headerWithWrapper);
			const terminalElement = document.getElementById('terminal');

			const termOptions = JSON.parse(message.data);
			term = new Terminal(termOptions);
			term.winptyCompatInit();

			/*
			term.on('key', (key: any, ev: any) => {
				vscode.postMessage({
					command: 'cli-input',
					data: key
				});
			});
			*/

			// hvata sve evente - i keystrokes i mouse evente
			term.on('data', (data: any) => {
				// console.log(`cli-input: ${data}`);
				vscode.postMessage({
					command: 'cli-input',
					data
				});
			});

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
			term.winptyCompatInit();
			term.webLinksInit();
			// term.fit();
			// term.toggleFullScreen(true);
			term.on('focus', () => {
				// console.log( `xterm  ${term.getOption('termName')} ima focus rows: ${term.cols} cols: ${term.rows}`);
				// console.log( `xterm ${term.getOption('termName')}: ${headerWithWrapper.clientWidth} ${headerWithWrapper.clientHeight}`);

				//const computedStyle = window.getComputedStyle( iframe.width);
				// const width = parseInt(computedStyle.getPropertyValue('width').replace('px', ''), 10);
				// const height = parseInt(computedStyle.getPropertyValue('height').replace('px', ''), 10);

				// term.element.click();
				// vscode.postMessage({
				// 	command: 'cli-input',
				// 	// data: '\x1b[11~'  // K_F1
				// 	data: '\x1b[24~' // K_F12
				// });
				// console.log('term on focus');
				vscode.postMessage({
					command: 'cli-focus'
				});
			});

			term.on('title', (title: string) => {
				// console.log(`xterm title: ${title}`);
			});

			if (!term)
				vscode.postMessage({
					command: 'quit',
					data: "Term objekat error?!"
				});
			else
				term.focus();
			break;

		case 'term-write':
			if (term) term.write(message.data);
			break;

		// case 'term-focus':
		//	term ? term.focus() : vscode.postMessage({ command: 'alert', data: "term-focus ne radi?!" });
		//	break;
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
