'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20191122.2';
const execHashListS: any = {
  'linux-x64': '0c4ab5f6c38c8b334a8821026b49979a',
  'linux-x86': '9b0be97f1ef15df51f05b7d93c78bab1',
  'windows-x64': 'aa33c731178f878457ea3287dbdeb4c2',
  'windows-x86': '5316ec85a433d8e773d2dc06aa92615b'
};

const revisionE = '20191104.1';
const execHashListE: any = {
  'linux-x64': 'daf03e2c50bbe5712677c693fb4f6dd6',
  'linux-x86': 'f4d9c1ada6142c7ed67712710baa601c',
  'windows-x64': 'ac0e02bbaed8bb6848efce22d1d226eb',
  'windows-x86': 'f1789c1812430638885142f04731982c'
};

const revisionX = '20190911.1';
const execHashListX: any = {
  'linux-x64': '0733b27b0533242166d233b274704c4e',
  'linux-x86': '77044aa13f71bec15a3c17f17302f449',
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