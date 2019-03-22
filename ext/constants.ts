'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190322.1';
const execHashListS: any = {
  'linux-x64': 'b6993f16420b59aa8bf2a8a40a5483e6',
  'linux-x86': '78f34fb7a08323c59dc491bc673c5a61',
  'windows-x64': '341f7ef3ee04aa1a40aede1c183df78c',
  'windows-x86': 'e3da383d09e91fef143ec796dc2f8e8b'
};


const revisionX = '20190320.6';
const execHashListX: any = {
  'linux-x64': '61e360c1ea91cef98ace5587c9b0892e',
  'linux-x86': 'f287a3df59a68456ca2ce030bc3195c2',
  'windows-x64': '6d688469e1a18298ade6fd0ee9ab5331',
  'windows-x86': 'b57ee647810d83ae901c0739edabbe20'
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