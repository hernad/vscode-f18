'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.22.44';
const execHashListS: any = {
  'linux-x64': '2b2051c19519e2d6abb25f0be928aa91',
  'windows-x64': '9798ae356e04eee9d52b28c0eb52be7d',
  'windows-x86': 'a85759dd0f5463d1a9f4cc7139716dea'
};

const revisionE = '4.22.26';
const execHashListE: any = {
  'linux-x64': '2e553fa9a77429500c9981294f8cb3c4',
  'windows-x64': 'f5d37b8c76f30c10fdd505d1ec8fa979',
  'windows-x86': 'aec90982041d30ee90da01710f549f6c'
};

const revisionX = '4.22.54';
const execHashListX: any = {
  'linux-x64': 'c78ba866980fd1b06783395444dd4959',
  'windows-x64': 'f323249688a560aaec816372c16c600a',
  'windows-x86': 'adb7667247a5c498567576af3b2fb42a'
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