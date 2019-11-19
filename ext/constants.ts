'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20191119.1';
const execHashListS: any = {
  'linux-x64': '927185fdb48877b73888d1e696e44d57',
  'linux-x86': '9902da5e6a938f0c35d3bdc409e63e79',
  'windows-x64': 'ff6c6d97368d232c8a3e478f29f7cafb',
  'windows-x86': 'b0627d6f50205dc0d7a8e8a2a0e56dd3'
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