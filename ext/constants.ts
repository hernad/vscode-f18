'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '4.22.34';
const execHashListS: any = {
  'linux-x64': 'ba3cbe56cda365569890a76c05ad2d9f',
  'windows-x64': 'ebdb328bda3fcc0f76fd4bc312779942',
  'windows-x86': 'c0096f7563d40c57137e75bf92a8d88b'
};

const revisionE = '4.22.26';
const execHashListE: any = {
  'linux-x64': '2e553fa9a77429500c9981294f8cb3c4',
  'windows-x64': 'f5d37b8c76f30c10fdd505d1ec8fa979',
  'windows-x86': 'aec90982041d30ee90da01710f549f6c'
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