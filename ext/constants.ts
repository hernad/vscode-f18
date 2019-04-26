'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190425.3';
const execHashListS: any = {
  'linux-x64': '5d67d00a39838e401bbeecfc447d972e',
  'linux-x86': '4fea35e4dcf3da8747496a4a99ff6bec',
  'windows-x64': 'e6e2c7c46169665b7ad28d2e98433550',
  'windows-x86': 'e8fbe54275a5ce4677273dfe1b09cdb1'
};


const revisionE = '20190415.6';
const execHashListE: any = {
  'linux-x64': '6481ca4ca78f78c9dce66a65ff62db54',
  'linux-x86': '587d8a86a7312a2b3d8c18083c906b06',
  'windows-x64': 'd7332611f5ef4f07237f002d0397d629',
  'windows-x86': '17f0fc3f09b57c335088bc40122dfb35'
};


const revisionX = '20190409.1';
const execHashListX: any = {
  'linux-x64': '5eac6fc54f7f2a6ae15acce39e87e168',
  'linux-x86': 'd40cb384ab4de776d5144bdec69989f3',
  'windows-x64': '9ff5a24ef7be3ac1416852c11e800366',
  'windows-x86': '5f50d496d4c769262366a756ebc542ef'
};

// const revisionE = revisionX;
// const execHashListE = execHashListX;

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