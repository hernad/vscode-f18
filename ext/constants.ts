'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190321.2';
const execHashListS: any = {
  'linux-x64': '3c42dce5246e64d4bd0399e9c87746e4',
  'linux-x86': '77a39200eb0bf030e820d9807c480cc9',
  'windows-x64': 'bf7eadf92a8f6c876a067060625ee984',
  'windows-x86': '158546a4b0c40b7dce16e2978d326dac'
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