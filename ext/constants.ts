'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190612.1';
const execHashListS: any = {
  'linux-x64': '62c2c85b152709713ac8fc3a1ae2248c',
  'linux-x86': 'b7dc2243fde043d64a6756f4ecec56cd',
  'windows-x64': 'ed49d493fcefd392aa0dffbb043aeeeb',
  'windows-x86': '4836c5c6d8373b6788594704b0aed330'
};

const revisionE = '20190529.1';
const execHashListE: any = {
  'linux-x64': '086f108468fcf8c19450c198c72fde51',
  'linux-x86': '02a18897a3d2b21964d1ec4ef2a5721f',
  'windows-x64': '19c3f907af733e951422e0a445310a9a',
  'windows-x86': '1d2dd916bc871572e7c1c7dfef5ff2cf'
};


const revisionX = '20190521.1';
const execHashListX: any = {
  'linux-x64': 'eeb0ae94aaf00447891d3dc10a8973d6',
  'linux-x86': '39a7acdd7711e6d60fd2a3837fa344c1',
  'windows-x64': 'd7442af2bd929ed2b4020acc162182a7',
  'windows-x86': '4e23bd79a1d316f981630c92a3469312'
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