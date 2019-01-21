'use strict';
import * as keytarType from 'keytar';
import * as yauzlType from 'yauzl';
// import * as httpType from 'http-proxy-agent';
import * as httpsType from 'https-proxy-agent';


import { Constants } from './constants'
import * as vscode from 'vscode';

/*

export interface IConnection {
  label: string;
  readonly host: string;
  readonly user: string;
  password?: string;
  hasPassword?: boolean;
  readonly port: number;
  readonly database?: string;
  multipleStatements?: boolean;
  readonly certPath?: string;
  ssl?: any;
}

Global.context usage:

define in function activate(context: vscode.ExtensionContext):
       Global.context = context;

let connections = Global.context.globalState.get<{ [key: string]: IConnection }>(Constants.GlobalStateKey);
    
let absFilePath = Global.context.asAbsolutePath(filePath);

const connections = this.context.globalState.get<{[key: string]: IConnection}>(Constants.GlobalStateKey);
    
let connection: IConnection = Object.assign({}, connections[id]);
        if (connection.hasPassword || !connection.hasOwnProperty('hasPassword')) {
          connection.password = await Global.keytar.getPassword(Constants.ExtensionId, id);
        }


async run() {
  ...
  connections[id].hasPassword = !!password;
  if (connections[id].hasPassword) {
      await Global.keytar.setPassword(Constants.ExtensionId, id, password);
  }

  await tree.context.globalState.update(Constants.GlobalStateKey, connections);
  ...
}

private static async deleteConnection(connections: { [key: string]: IConnection }, key: string) {
    delete connections[key];
    
    await Global.context.globalState.update(Constants.GlobalStateKey, connections);
    await Global.keytar.deletePassword(Constants.ExtensionId, key);

    ...
}

async writeFile(uri: vscode.Uri, content: Uint8Array, options: {create: boolean, overwrite: boolean}): Promise<void> {
    let connFile = uri.path.substr(1);
    let fileExt = path.posix.extname(connFile);
    if (fileExt !== '.json') {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    let connectionKey = path.posix.basename(connFile, fileExt);

    const connections = Global.context.globalState.get<{[key: string]: IConnection}>(Constants.GlobalStateKey);
    
    if (!connections || !connections.hasOwnProperty(connectionKey))
      throw vscode.FileSystemError.FileNotFound(uri);
    
    let newDetails = JSON.parse(content.toString());

    if (!newDetails.host) throw vscode.FileSystemError.NoPermissions(`Missing "host" key`);
    if (!newDetails.user) throw vscode.FileSystemError.NoPermissions(`Missing "user" key`);
    if (!newDetails.port) throw vscode.FileSystemError.NoPermissions(`Missing "port" key`);
    if (!newDetails.hasOwnProperty('password'))
      throw vscode.FileSystemError.NoPermissions(`Missing "password" key`);
        
    let pwd = newDetails.password;
    delete newDetails.password;
    let connection: IConnection = Object.assign({}, newDetails);
    connection.hasPassword = !!pwd;

    connections[connectionKey] = connection;
    const tree = PostgreSQLTreeDataProvider.getInstance();

    if (connection.hasPassword) {
>>>>      await Global.keytar.setPassword(Constants.ExtensionId, connectionKey, pwd);
    }
    await Global.context.globalState.update(Constants.GlobalStateKey, connections)
    
    tree.refresh();
    this._fireSoon({type: vscode.FileChangeType.Changed, uri});
}


async () => {
			const keytar = await import('keytar');
			const name = `VSCode Test ${Math.floor(Math.random() * 1e9)}`;
			try {
				await keytar.setPassword(name, 'foo', 'bar');
				assert.equal(await keytar.getPassword(name, 'foo'), 'bar');
				await keytar.deletePassword(name, 'foo');
				assert.equal(await keytar.getPassword(name, 'foo'), undefined);
			} catch (err) {
				// try to clean up
				try {
					await keytar.deletePassword(name, 'foo');
				} finally {
					// tslint:disable-next-line: no-unsafe-finally
					throw err;
				}
			}
}
    
*/

export class Global {
  public static keytar: typeof keytarType = getCoreNodeModule('keytar');
  public static yauzl: typeof yauzlType = getCoreNodeModule('yauzl');
  //public static httpProxyAgent: typeof httpType = getCoreNodeModule('http-proxy-agent');
  public static httpsProxyAgent: typeof httpsType = getCoreNodeModule('https-proxy-agent');
  
  public static context: vscode.ExtensionContext = null;

  public static get Configuration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(Constants.ExtensionId);
  }
}

function getCoreNodeModule(moduleName: string) {
  try {
    return require(`${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
  } catch(err) { }

  try {
    return require(`${vscode.env.appRoot}/node_modules/${moduleName}`);
  } catch(err) { }

  return null;
}