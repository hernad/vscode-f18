'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '4.22.8';
const execHashListS: any = {
  'linux-x64': '98e682faef9f0dc00c3353c8d0030518',
  'windows-x64': '4a187c425ae6e9031d8670086ee71a6c',
  'windows-x86': '81864777833324f60e4280741fee18c7'
};

const revisionE = '4.21.15';
const execHashListE: any = {
  'linux-x64': '72e82c3e39a8887140cacc9d0687ef4a',
  'windows-x64': 'd7ff4eb59f920f63c033d9c29402902a',
  'windows-x86': '482b8728a03b1eef34a4391070e0815a'
};

const revisionX = '4.21.14';
const execHashListX: any = {
  'linux-x64': 'c59d595cf37b55a30b7c0c5bb55e20f8',
  'windows-x64': '9268c1cb18df8f2d0ed6a3e6f7ce8317',
  'windows-x86': '8fca7072dee4f238ceda44cb317456f8'
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