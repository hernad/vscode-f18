'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190329.5';
const execHashListS: any = {
  'linux-x64': 'af826ce68734d1373f5d6a40abc67342',
  'linux-x86': '6daef05b5d756eabfdf77cf02c9dccf1',
  'windows-x64': 'f552b78df4cf5ef23e454371c8fb1806',
  'windows-x86': '706b36b3a98cf3a10eff1367d3657036'
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