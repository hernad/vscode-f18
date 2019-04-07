'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190405.3';
const execHashListS: any = {
  'linux-x64': '09eba6c051fa0acb299e80afe587f8c0',
  'linux-x86': 'b7e02123b94be70790c79331e6234c7e',
  'windows-x64': '54130d90b1eb58d42d2221d647660a96',
  'windows-x86': '93c37810d6d7b1dbcfd517d6407fe61d'
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