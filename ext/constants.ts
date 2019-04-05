'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '20190405.2';
const execHashListS: any = {
  'linux-x64': '759e09ae9c4ef65056bee01125a3eb60',
  'linux-x86': '6a5faa99365b7e5212935db5b162f5fc',
  'windows-x64': 'ddd3b66edc156e47e7d9233f5a45ab30',
  'windows-x86': 'd0ceb2c35d775b158c4a06112a969a9b'
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