'use strict';
import * as keytarType from 'keytar';
import * as yauzlType from 'yauzl';
import * as ptyType from 'node-pty';
// import * as httpType from 'http-proxy-agent';
// @ts-ignore
import * as httpsType from 'https-proxy-agent';
import { Constants } from './constants'
import * as vscode from 'vscode';
//import { IConnection } from './IConnection';

export class Global {
  public static keytar: typeof keytarType = getCoreNodeModule('keytar');
  public static yauzl: typeof yauzlType = getCoreNodeModule('yauzl');
  //public static httpProxyAgent: typeof httpType = getCoreNodeModule('http-proxy-agent');
  public static httpsProxyAgent: typeof httpsType = getCoreNodeModule('https-proxy-agent');
  public static pty: typeof ptyType = getCoreNodeModule('node-pty');
  public static context: vscode.ExtensionContext;
  public static contextPostgres: vscode.ExtensionContext;
  public static execPath: string;
  public static folderPath: string;

  public static get PostgresConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(Constants.PostgresExtensionId);
  }
}

export function getCoreNodeModule(moduleName: string) {
  try {

    // /usr/share/code/resources/app/node_modules.asar/keytar
    return require(`${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
  } catch (err) {
    console.log(`coreNodeModule1: ${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
  }

  try {
    // /usr/share/code/resources/app/node_modules.asar.unpacked/
    return require(`${vscode.env.appRoot}/node_modules.asar.unpacked/${moduleName}`);
  } catch (err) {
    console.log(`ERR-coreNodeModule2: ${vscode.env.appRoot}/node_modules.asar.unpacked/${moduleName}`);
  }

  try {
    return require(`${vscode.env.appRoot}/node_modules/${moduleName}`);
  } catch (err) {
    console.log(`ERR-coreNodeModule3: ${vscode.env.appRoot}/node_modules/${moduleName}`);
  }

  return null;
}

export function vscode_version_match(major: number, minor: number) {

  return vscode.version.match(new RegExp(`${major}\.${minor}\.*`, ''));

}