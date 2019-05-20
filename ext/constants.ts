'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190520.1';

const execHashListS: any = {
  'linux-x64': 'bccda9f761d87104406dad48cbb172a0',
  'linux-x86': 'ae0176237b324de8e044604fa25eef66',
  'windows-x64': '3682a0f168cbe009b2c3564adedbd436',
  'windows-x86': '4df86888c484f7d6a748a8fff1d839b0'
};


const revisionE = '20190514.3';
const execHashListE: any = {
  'linux-x64': '87084e21841b0023ac749c865f992fba',
  'linux-x86': '9e6690a229480fef645bc0ffe9b73d68',
  'windows-x64': '466a9a1d9ae615ae8caf99d5104b7dcb',
  'windows-x86': '9a7df2e8263eb4ca3fdb65c82ca7266f'
};


const revisionX = '20190506.2';
const execHashListX: any = {
  'linux-x64': 'a0e71a83482d19f4588489979301c288',
  'linux-x86': 'f62a6ad889985f3b90dc37462c6a01dc',
  'windows-x64': 'e09e0369eb115819da52e135180d50c7',
  'windows-x86': 'd0f331f3644a0ffa8db7a96b4c382df9'
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