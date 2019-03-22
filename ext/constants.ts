'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190322.2';
const execHashListS: any = {
  'linux-x64': 'cd892be6e793bfd6085c5cb5fe9a0f76',
  'linux-x86': '730a5f5bc9e6c11352064fb720e7d867',
  'windows-x64': '8b268d0ffb74ebca4d18ce2852c74f76',
  'windows-x86': '7ea8ab8644f7917145d7c02924808b64'
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