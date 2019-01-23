import * as vscode from 'vscode';
import { Global } from './global';
import { F18Panel } from './f18Panel';
import { PostgresConnection } from './postgresConnection';
import { IConnection } from './IConnection';

export function activate(context: vscode.ExtensionContext) {
	console.log('F18 ekstenzija aktivna :)');

	Global.context = context;
	//Global.contextPostgres =
	let postgresApi;

	const postgresExtension = vscode.extensions.getExtension('bout.postgres');
	postgresExtension.activate().then(() => {
		postgresApi = postgresExtension.exports;
		// console.log( `postgresql API: ${importedApi.sum(1, 1)} ${importedApi.context()}`);
		Global.contextPostgres = postgresApi.context();
		console.log('step: 0');
		return(1);
	}).then((result)=>{

		console.log(`step ${result}`);
		PostgresConnection.getDefaultConnection().then((connection: IConnection) => {
			console.log(connection.database);

			context.subscriptions.push(
				vscode.commands.registerCommand('f18.start.pos', () => {
					F18Panel.create(context.extensionPath, 'pos', connection);
				}),
				vscode.commands.registerCommand('f18.start.fin', () => {
					F18Panel.create(context.extensionPath, 'fin', connection);
				}),
				vscode.commands.registerCommand('f18.start.kalk', () => {
					F18Panel.create(context.extensionPath, 'kalk', connection);
				}),
				vscode.commands.registerCommand('f18.start.fakt', () => {
					F18Panel.create(context.extensionPath, 'fakt', connection);
				}),
				vscode.commands.registerCommand('f18.start.os', () => {
					F18Panel.create(context.extensionPath, 'os', connection);
				}),
				vscode.commands.registerCommand('f18.start.ld', () => {
					F18Panel.create(context.extensionPath, 'ld', connection);
				}),
				vscode.commands.registerCommand('f18.start.epdv', () => {
					F18Panel.create(context.extensionPath, 'epdv', connection);
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
		const onStart = vscode.workspace.getConfiguration('f18').get('onStart');
		vscode.commands.executeCommand(`f18.start.${onStart}`);
	}, 1000);
}

