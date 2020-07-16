'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '4.22.61';
const execHashListS: any = {
  'linux-x64': '8af7ee1ddfae4c956fa197a6ae656706',
  'windows-x64': '17e23ca061fc99d1be19f4b0a543d6b1',
  'windows-x86': 'a69d097ce103c7801204546bf80086f9'
};


const revisionE = '4.22.57';
const execHashListE: any = {
  'linux-x64': 'd86b86f8579541f5e486fdc48f0b6604',
  'windows-x64': '173ccf0dc6bedb567f03dc52341634f2',
  'windows-x86': 'c1f07f06cbdd497ae4c68a7dc4ab4236'
};


const revisionX = '4.22.54';
const execHashListX: any = {
  'linux-x64': 'c78ba866980fd1b06783395444dd4959',
  'windows-x64': 'f323249688a560aaec816372c16c600a',
  'windows-x86': 'adb7667247a5c498567576af3b2fb42a'
};


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