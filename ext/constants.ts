'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190320.4';
const execHashListS: any = {
  'linux-x64': '221de1bffbfce517285cd689b54e1c3e',
  'linux-x86': '331438c1138de746f562833ac1b5ba95',
  'windows-x64': '7b9cf67d76a822881233384f20f7ca43',
  'windows-x86': '26b7d00fe94453752185ff9df6c75212'
};


const revisionE = revisionS;
const execHashListE = execHashListS;

const revisionX = revisionS;
const execHashListX = execHashListS;

//const revisionX = '20190307.1';
//const execHashListX: any = {
//  'linux-x64': '870513e85917bd102a0a1ec9288b4329',
//  'linux-x86': '2bd88996b9bece79eea240f174cec587',
//  'windows-x64': '96f426d89cebd99b38feff08b247cc4a',
//  'windows-x86': '5389398a31fb74b938e51b940fbca9db'
//};


const execHashListAll: any = {
   'S': execHashListS,
   'E': execHashListE,
   'X': execHashListX
};

const revisionAll: any = {
  'S': revisionS,
  'E': revisionE,
  'X': revisionX
}

const versionChannel: string = vscode.workspace.getConfiguration('f18').get('verChannel');

export const revision = revisionAll[versionChannel];
export const execHashList = execHashListAll[versionChannel];