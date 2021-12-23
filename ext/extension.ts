import { ExtensionContext, commands, window, extensions, workspace, ViewColumn } from 'vscode';
import { Global } from './global';
import { F18Panels } from './f18Panel';
import { PostgresConnection } from './postgresConnection';
import { IConnection } from './IConnection';

export function activate(context: ExtensionContext) {
	console.log('F18 ekstenzija aktivna :)');

	Global.context = context;

	context.subscriptions.push(
		commands.registerCommand('f18.start.cmd', () => {
			F18Panels.createF18Instance('cmd', '');
		})
	)

	context.subscriptions.push(
		commands.registerCommand('f18.focus', () => {
			if (F18Panels.last_instance) {
				F18Panels.last_instance.webPanel.reveal(ViewColumn.Active, false);
				F18Panels.last_instance.webPanel.webview.postMessage({ command: 'focus-back' });
			}
		})
	)

	const postgresExtension = extensions.getExtension('bringout.postgres');
	if (postgresExtension == undefined) { 
		window.showErrorMessage('Instalirati bringout.postgres !');
		return;
    };

	postgresExtension.activate().then(() => {
		const postgresApi = postgresExtension.exports;
		// console.log( `postgresql API: ${importedApi.sum(1, 1)} ${importedApi.context()}`);
		Global.contextPostgres = postgresApi.context();
		
		return(1);
	}).then((result)=>{

		// console.log(`step ${result}`);
		PostgresConnection.checkConnection()
		  .then( (ret: number) => {
	
			if (ret > 0) {
				//window.showInformationMessage(`connected ${ret}`);
				//console.log(connection.database);
				context.subscriptions.push(
					commands.registerCommand('f18.selectDatabase',
						() => commands.executeCommand('postgres.selectDatabase').then(() => console.log('selected database'))
					),
					commands.registerCommand('f18.start.pos', () => {
						F18Panels.createF18Instance('pos', '');
					}),
					commands.registerCommand('f18.start.fin', () => {
						F18Panels.createF18Instance('fin', '');
					}),
					commands.registerCommand('f18.start.kalk', () => {
						F18Panels.createF18Instance('kalk', '');
					}),
					commands.registerCommand('f18.start.fakt', () => {
						F18Panels.createF18Instance('fakt', '');
					}),
					commands.registerCommand('f18.start.os', () => {
						F18Panels.createF18Instance('os', '');
					}),
					commands.registerCommand('f18.start.ld', () => {
						F18Panels.createF18Instance('ld', '');
					}),
					commands.registerCommand('f18.start.epdv', () => {
						F18Panels.createF18Instance('epdv', '');
					}),
					commands.registerCommand('f18.start.pos_pg', () => {
						F18Panels.createF18Instance('pos', 'pg');
					}),
					commands.registerCommand('f18.start.fin_pg', () => {
						F18Panels.createF18Instance('fin', 'pg');
					}),
					commands.registerCommand('f18.start.kalk_pg', () => {
						F18Panels.createF18Instance('kalk', 'pg');
					}),
					commands.registerCommand('f18.start.fakt_pg', () => {
						F18Panels.createF18Instance('fakt', 'pg');
					}),
					commands.registerCommand('f18.start.os_pg', () => {
						F18Panels.createF18Instance('os', 'pg');
					}),
					commands.registerCommand('f18.start.ld_pg', () => {
						F18Panels.createF18Instance('ld', 'pg');
					}),
					commands.registerCommand('f18.start.epdv_pg', () => {
						F18Panels.createF18Instance('epdv', 'pg');
					})
				);
				
				const onStartDelay: number = workspace.getConfiguration('f18').get('onStartDelay');
				//setTimeout(() => {
					const onStart: string = workspace.getConfiguration('f18').get('onStart');
					if (onStart.trim() !== '')
						commands.executeCommand(`f18.start.${onStart}`);
				//}, onStartDelay);

			} else {
				window.showErrorMessage("SERVER NIJE DOSTUPAN! Pozovite bring.out podršku");
			}
		});
		
		 
	});


	const fullScreen = workspace.getConfiguration('f18').get('fullScreen');
	
	if (fullScreen) commands.executeCommand('workbench.action.toggleFullScreen');

	commands.executeCommand('workbench.action.closeAllEditors');

	// activity bar always visible
	if (!workspace.getConfiguration('workbench').get('activityBar.visible'))
		commands.executeCommand('workbench.action.toggleActivityBarVisibility');

	// const visibleSideBar = vscode.workspace.getConfiguration('workbench').get('sideBar.location');
	// vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');

	
}

