'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190327.4';
const execHashListS: any = {
  'linux-x64': '5c6863cbf40fd07df6c2e7b7fd2ef1ec',
  'linux-x86': '3c733a1dd7256e88d0dfcf0abfaec3c1',
  'windows-x64': 'a460b15d821012ff2897772a97adf1f0',
  'windows-x86': '9245f6096cd828b95d9b7e4ca04416f8'
};


const revisionX = '20190325.1';
const execHashListX: any = {
  'linux-x64': 'd6ab6b81353b69e74d5c847207e110cb',
  'linux-x86': '6f28cbead19182920000269649f5dfc8',
  'windows-x64': '8c868fc1c7deb41784ec722a66e9a4c9',
  'windows-x86': '556cec004fce79bf7a12a463ca2ccf41'
};


const revisionE = revisionX;
const execHashListE = execHashListX;

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