'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190329.4';
const execHashListS: any = {
  'linux-x64': 'e6fd87cd87301d03958b67857960fcf9',
  'linux-x86': 'adcae45c7c6a5bf5f9be7643d67005c7',
  'windows-x64': '379d9f5be6b24817244c8b089e347865',
  'windows-x86': 'ee1072ebaa71d7f44d5f0fc7e1f6b2ef'
};


const revisionX = '20190328.3';
const execHashListX: any = {
  'linux-x64': '505772cb2dfb973ce1cb69f0dbd50c29',
  'linux-x86': 'ffed34c59d7c84180abd973c78a5c8a6',
  'windows-x64': 'd4d3045586c503afaacb02f9f8134341',
  'windows-x86': '556cec004fce79bf7a12a463ca2ccf41'
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