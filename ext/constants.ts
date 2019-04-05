'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190405.1';
const execHashListS: any = {
  'linux-x64': 'd93d77824ba56f3d031cd6b1c162e75f',
  'linux-x86': '9bc35a0fce46e04f6f6d12644dc6a222',
  'windows-x64': 'a9358bb91c145c0accfc8303121c8a55',
  'windows-x86': '3d82d603d656dd03ce73b25e3a324936'
};


const revisionX = '20190402.1';
const execHashListX: any = {
  'linux-x64': '60b94d8032af4ba861261d2c9152c072',
  'linux-x86': '5a2f761b0cb8af48198ebc10e7305f4f',
  'windows-x64': '94b754829467b9bf9bf2e2ce95e46184',
  'windows-x86': '8a57e7396ff450ec0238a01d8415415d'
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