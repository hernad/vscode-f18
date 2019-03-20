'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190320.1';
const execHashListS: any = {
  'linux-x64': 'a20922768ad55614332589443cc610b5',
  'linux-x86': '07d7f6ce8f6ea04df1c713278592e551',
  'windows-x64': 'cf71d7b785fa432d72a643e201ddb49a',
  'windows-x86': 'a9ee41a1ef98cffbca331c44dd6e33a7'
};


const revisionE = revisionS;
const execHashListE = execHashListS;

//const revisionE = '20190306.1';
//const execHashListE: any = {
//  'linux-x64': 'b0c9d4e31604cab6a08994065c815a6c',
//  'linux-x86': '55d7f180f9ba9a2cee9a66e5ffa83969',
//  'windows-x64': 'd410ce0359bd67beae166813b844f82d',
//  'windows-x86': '5042b015cecf9a3105075861d85e9b95'
//};


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