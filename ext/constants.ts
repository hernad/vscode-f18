'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190625.1';
const execHashListS: any = {
  'linux-x64': 'ba03d913236358ed2a0aa272e16d7996',
  'linux-x86': 'a6fbc2ac603c5fd3e6bbbe8c8e6b322c',
  'windows-x64': '7e757d77380b4102eba63ef1a6185b7f',
  'windows-x86': 'fce90137d717fd265f7e658cd111cf1a'
};


const revisionE = '20190612.1';
const execHashListE: any = {
  'linux-x64': '62c2c85b152709713ac8fc3a1ae2248c',
  'linux-x86': 'b7dc2243fde043d64a6756f4ecec56cd',
  'windows-x64': 'ed49d493fcefd392aa0dffbb043aeeeb',
  'windows-x86': '4836c5c6d8373b6788594704b0aed330'
};

const revisionX = '20190529.1';
const execHashListX: any = {
  'linux-x64': '086f108468fcf8c19450c198c72fde51',
  'linux-x86': '02a18897a3d2b21964d1ec4ef2a5721f',
  'windows-x64': '19c3f907af733e951422e0a445310a9a',
  'windows-x86': '1d2dd916bc871572e7c1c7dfef5ff2cf'
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