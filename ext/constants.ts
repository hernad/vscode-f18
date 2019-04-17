'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190417.8';
const execHashListS: any = {
  'linux-x64': '87bdb96a4ed807fa281e851f78d9ba89',
  'linux-x86': '4bb9b29bb77032200c4b067667fcdd4e',
  'windows-x64': '1d7b7b9a4760dc3d71a3d60c6cc83a92',
  'windows-x86': '62cd5b5781bf96be78bd59d96686c7bd'
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