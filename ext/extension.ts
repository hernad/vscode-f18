import * as vscode from 'vscode';
import { Global } from './global';
import { F18Panel } from './f18_panel';

export function activate(context: vscode.ExtensionContext) {
	console.log('F18 ekstenzija aktivna :)');

	Global.context = context;

	context.subscriptions.push(
		vscode.commands.registerCommand('f18.start.pos', () => {
			F18Panel.create(context.extensionPath, 'pos', 'proba_2018');
		}),
		vscode.commands.registerCommand('f18.start.fin', () => {
			F18Panel.create(context.extensionPath, 'fin', 'proba_2018');
		}),
		vscode.commands.registerCommand('f18.start.kalk', () => {
			F18Panel.create(context.extensionPath, 'kalk', 'proba_2018');
		})
	);

	const fullScreen = vscode.workspace.getConfiguration('f18').get('fullScreen');

	//NEVER_MEASURE_RENDER_TIME_STORAGE_KEY = 'terminal.integrated.neverMeasureRenderTime'

	if (fullScreen) vscode.commands.executeCommand('workbench.action.toggleFullScreen');

	vscode.commands.executeCommand('workbench.action.closeAllEditors');

	// activity bar always visible
	if (!vscode.workspace.getConfiguration('workbench').get('activityBar.visible'))
		vscode.commands.executeCommand('workbench.action.toggleActivityBarVisibility');

	// const visibleSideBar = vscode.workspace.getConfiguration('workbench').get('sideBar.location');
	// vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');

	setTimeout(() => {
		const onStart = vscode.workspace.getConfiguration('f18').get('onStart');
		vscode.commands.executeCommand(`f18.start.${onStart}`);
	}, 1000);
}

