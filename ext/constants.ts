'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190325.2';
const execHashListS: any = {
  'linux-x64': 'ea72502dc57a3c9d63500d8466b0f84a',
  'linux-x86': '8c74795e8f48a0eeea016ab2aefc0f2f',
  'windows-x64': 'b7a5b98b56812547136f5805de51fc64',
  'windows-x86': '94f6cf18548d7b1357d0a16c314f191c'
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