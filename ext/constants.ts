'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190321.1';
const execHashListS: any = {
  'linux-x64': 'fb3344193d5c870e90354d877f4a142c',
  'linux-x86': 'd16c718512f84cec4b01f093e8798420',
  'windows-x64': 'd39200212d7db157c3c1169c8b8e0e23',
  'windows-x86': '99fbbb9c196ac6b57dce6c0bdf19e85e'
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