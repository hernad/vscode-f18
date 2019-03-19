'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190319.1';
const execHashListS: any = {
  'linux-x64': '396782e0516f7fbebc7043cadd73b465',
  'linux-x86': '783d84714837674ccad4c6c06ffe6df8',
  'windows-x64': 'b7781b81a6e8fdd280a1a32097449f51',
  'windows-x86': '26907b8ad6ad0a2fc307cdc9288d3eec'
};



const revisionE = '20190306.1';
const execHashListE: any = {
  'linux-x64': 'b0c9d4e31604cab6a08994065c815a6c',
  'linux-x86': '55d7f180f9ba9a2cee9a66e5ffa83969',
  'windows-x64': 'd410ce0359bd67beae166813b844f82d',
  'windows-x86': '5042b015cecf9a3105075861d85e9b95'
};

const revisionX = '20190307.1';
const execHashListX: any = {
  'linux-x64': '870513e85917bd102a0a1ec9288b4329',
  'linux-x86': '2bd88996b9bece79eea240f174cec587',
  'windows-x64': '96f426d89cebd99b38feff08b247cc4a',
  'windows-x86': '5389398a31fb74b938e51b940fbca9db'
};


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