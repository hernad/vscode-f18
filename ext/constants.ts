'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.21.15';
const execHashListS: any = {
  'linux-x64': '72e82c3e39a8887140cacc9d0687ef4a',
  'windows-x64': 'd7ff4eb59f920f63c033d9c29402902a',
  'windows-x86': '482b8728a03b1eef34a4391070e0815a'
};

const revisionE = '4.21.14';
const execHashListE: any = {
  'linux-x64': 'c59d595cf37b55a30b7c0c5bb55e20f8',
  'windows-x64': '9268c1cb18df8f2d0ed6a3e6f7ce8317',
  'windows-x86': '8fca7072dee4f238ceda44cb317456f8'
};


const revisionX = '20190911.1';
const execHashListX: any = {
  'linux-x64': '0733b27b0533242166d233b274704c4e',
  'windows-x64': '34af5ed5f5f1de87e61257d63ca3d19e',
  'windows-x86': 'bae6ce81080ab45ddd4b33b27ee31e2e'
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