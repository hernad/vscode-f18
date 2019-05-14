'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190514.3';
const execHashListS: any = {
  'linux-x64': '87084e21841b0023ac749c865f992fba',
  'linux-x86': '9e6690a229480fef645bc0ffe9b73d68',
  'windows-x64': '466a9a1d9ae615ae8caf99d5104b7dcb',
  'windows-x86': '9a7df2e8263eb4ca3fdb65c82ca7266f'
};


const revisionE = '20190506.2';
const execHashListE: any = {
  'linux-x64': 'a0e71a83482d19f4588489979301c288',
  'linux-x86': 'f62a6ad889985f3b90dc37462c6a01dc',
  'windows-x64': 'e09e0369eb115819da52e135180d50c7',
  'windows-x86': 'd0f331f3644a0ffa8db7a96b4c382df9'
};

const revisionX = '20190409.1';
const execHashListX: any = {
  'linux-x64': '5eac6fc54f7f2a6ae15acce39e87e168',
  'linux-x86': 'd40cb384ab4de776d5144bdec69989f3',
  'windows-x64': '9ff5a24ef7be3ac1416852c11e800366',
  'windows-x86': '5f50d496d4c769262366a756ebc542ef'
};

// const revisionE = revisionX;
// const execHashListE = execHashListX;

//const revisionX = revisionS;
//const execHashListX = execHashListS;


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