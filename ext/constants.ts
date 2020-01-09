'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.22.12';
const execHashListS: any = {
  'linux-x64': '1ac8073a8bcce0ae040a3714cc3202fd',
  'windows-x64': '399bed10e0ed409d581543af5fc47188',
  'windows-x86': '9e4806dc9684b4738a25f35a0da658ad'
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