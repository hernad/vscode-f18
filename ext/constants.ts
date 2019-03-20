'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190320.5';
const execHashListS: any = {
  'linux-x64': 'ac6819fb1ee814fb5e7e4de56052c85d',
  'linux-x86': '71639f2774d92d76e0464cd1fa786d6b',
  'windows-x64': '7324273572ed9fb4c55afad0db5505c0',
  'windows-x86': '7072da58ee941674ad2fee75f7e7f2e7'
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