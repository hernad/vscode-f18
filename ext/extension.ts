import * as vscode from 'vscode';
import { Global } from './global';
import { F18Panel } from './f18Panel';
import { PostgresConnection } from './postgresConnection';
import { IConnection } from './IConnection';
import { isContext } from 'vm';
// import { Helper } from './helper';

export function activate(context: vscode.ExtensionContext) {
	console.log('F18 ekstenzija aktivna :)');

	Global.context = context;

	//Helper.linux_distribution().then((dist: string) => {
	//	vscode.window.showInformationMessage(dist)
	//});

	context.subscriptions.push(
		vscode.commands.registerCommand('f18.start.cmd', () => {
			F18Panel.createF18Instance('cmd');
		})
	)

	const postgresExtension = vscode.extensions.getExtension('bringout.postgres');
	if (postgresExtension == undefined) { 
		vscode.window.showErrorMessage('Instalirati bringout.postgres !');
		return;
    };

	postgresExtension.activate().then(() => {
		const postgresApi = postgresExtension.exports;
		// console.log( `postgresql API: ${importedApi.sum(1, 1)} ${importedApi.context()}`);
		Global.contextPostgres = postgresApi.context();
		// console.log('step: 0');
		return(1);
	}).then((result)=>{

		// console.log(`step ${result}`);
		PostgresConnection.getDefaultConnection().then((connection: IConnection) => {
			// console.log(connection.database);
			
			context.subscriptions.push(
				vscode.commands.registerCommand('f18.selectDatabase',
					() => vscode.commands.executeCommand('postgres.selectDatabase').then(() => console.log('selected database'))
				),
				vscode.commands.registerCommand('f18.start.pos', () => {
					F18Panel.createF18Instance('pos');
				}),
				vscode.commands.registerCommand('f18.start.fin', () => {
					F18Panel.createF18Instance('fin');
				}),
				vscode.commands.registerCommand('f18.start.kalk', () => {
					F18Panel.createF18Instance('kalk');
				}),
				vscode.commands.registerCommand('f18.start.fakt', () => {
					F18Panel.createF18Instance('fakt');
				}),
				vscode.commands.registerCommand('f18.start.os', () => {
					F18Panel.createF18Instance('os');
				}),
				vscode.commands.registerCommand('f18.start.ld', () => {
					F18Panel.createF18Instance('ld');
				}),
				vscode.commands.registerCommand('f18.start.epdv', () => {
					F18Panel.createF18Instance('epdv');
				})
			);
		});
	});


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
		const onStart: string = vscode.workspace.getConfiguration('f18').get('onStart');
		if (onStart.trim() !== '')
			vscode.commands.executeCommand(`f18.start.${onStart}`);
	}, 1000);
}

