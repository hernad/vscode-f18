'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190703.2';
const execHashListS: any = {
  'linux-x64': 'f93fdf50f1b7d68477e7640f1f081cf8',
  'linux-x86': 'c84008a67db99686e9cb47a6a983ca93',
  'windows-x64': 'd67177139621cd82fc1c1de08cf88ac6',
  'windows-x86': '275212c36119d6cef5754ef6c3d83d7f'
};

const revisionE = '20190626.3';
const execHashListE: any = {
  'linux-x64': '9e209453ff2cdb931efa5d58dbcfc318',
  'linux-x86': '02d5a825a87188c8074f4953886d25bd',
  'windows-x64': '5d6bf786178847929bc8a54551711e84',
  'windows-x86': '0fb949b1c88c3f0a7a3525560660d8cc'
};


const revisionX = '20190612.1';
const execHashListX: any = {
  'linux-x64': '62c2c85b152709713ac8fc3a1ae2248c',
  'linux-x86': 'b7dc2243fde043d64a6756f4ecec56cd',
  'windows-x64': 'ed49d493fcefd392aa0dffbb043aeeeb',
  'windows-x86': '4836c5c6d8373b6788594704b0aed330'
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