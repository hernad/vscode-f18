'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190703.4';
const execHashListS: any = {
  'linux-x64': 'db022db1346a68b630831fe461e8d274',
  'linux-x86': 'be9879b9498c535f9197ee6e335b5c52',
  'windows-x64': '2ec3684c4087354d158eaff299e06424',
  'windows-x86': 'e023569b58d13009474d35a2616b3f96'
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