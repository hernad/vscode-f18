'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.22.57';
const execHashListS: any = {
  'linux-x64': 'd86b86f8579541f5e486fdc48f0b6604',
  'windows-x64': '173ccf0dc6bedb567f03dc52341634f2',
  'windows-x86': 'c1f07f06cbdd497ae4c68a7dc4ab4236'
};

const revisionE = '4.22.56';
const execHashListE: any = {
  'linux-x64': 'b6bd292a92e744d5407ce60a87f48da0',
  'windows-x64': 'c03cf26bad8dc77cb9aff30935e920f8',
  'windows-x86': '28b7e29b0dde8d2305054e252667af51'
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