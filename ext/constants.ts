'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190321.4';
const execHashListS: any = {
  'linux-x64': '0f9836092ec6b5c7d365c3d5c4e2cc34',
  'linux-x86': 'd163c3e8c6abf3b7891e2985b93bcaf3',
  'windows-x64': '50171819f0acc023c089436ad54d6474',
  'windows-x86': '9628112c346b70230958531a14098a09'
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