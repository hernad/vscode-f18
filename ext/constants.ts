'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '4.21.2';
const execHashListS: any = {
  'linux-x64': '6accf5fd0b30c1b86ff7f0add7583389',
  'windows-x64': '8a9b80de77a64dd843c97bddbe39757a',
  'windows-x86': '9d2bb4f6ad62bba07a13a780fa21624d'
};

const revisionE = '20191122.2';
const execHashListE: any = {
  'linux-x64': '0c4ab5f6c38c8b334a8821026b49979a',
  'windows-x64': 'aa33c731178f878457ea3287dbdeb4c2',
  'windows-x86': '5316ec85a433d8e773d2dc06aa92615b'
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