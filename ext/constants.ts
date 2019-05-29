'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190529.1';
const execHashListS: any = {
  'linux-x64': '086f108468fcf8c19450c198c72fde51',
  'linux-x86': '02a18897a3d2b21964d1ec4ef2a5721f',
  'windows-x64': '19c3f907af733e951422e0a445310a9a',
  'windows-x86': '1d2dd916bc871572e7c1c7dfef5ff2cf'
};


const revisionE = '20190521.1';
const execHashListE: any = {
  'linux-x64': 'eeb0ae94aaf00447891d3dc10a8973d6',
  'linux-x86': '39a7acdd7711e6d60fd2a3837fa344c1',
  'windows-x64': 'd7442af2bd929ed2b4020acc162182a7',
  'windows-x86': '4e23bd79a1d316f981630c92a3469312'
};



const revisionX = '20190514.3';
const execHashListX: any = {
  'linux-x64': '87084e21841b0023ac749c865f992fba',
  'linux-x86': '9e6690a229480fef645bc0ffe9b73d68',
  'windows-x64': '466a9a1d9ae615ae8caf99d5104b7dcb',
  'windows-x86': '9a7df2e8263eb4ca3fdb65c82ca7266f'
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