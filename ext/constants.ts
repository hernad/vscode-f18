'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.22.13';
const execHashListS: any = {
  'linux-x64': '1539279f9fedbb2c3569da40fe7d6651',
  'windows-x64': '976defa332dcc95ef0f3a4db258d247f',
  'windows-x86': 'cdb89b6f3cbcbed101189b8d2aff50e9'
};

const revisionE = '4.21.15';
const execHashListE: any = {
  'linux-x64': '72e82c3e39a8887140cacc9d0687ef4a',
  'windows-x64': 'd7ff4eb59f920f63c033d9c29402902a',
  'windows-x86': '482b8728a03b1eef34a4391070e0815a'
};


const revisionX = '4.23.0';
const execHashListX: any = {
  'linux-x64': '0b692e84546ba6535fb9e2264e1baf68',
  'windows-x64': '68cf99a02c54a213e8e8a52dff46f404',
  'windows-x86': '6c4732ac95716abfbdd31628f653fb9d'
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