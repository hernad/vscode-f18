'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190425.2';
const execHashListS: any = {
  'linux-x64': 'c8610745e36482531c4af89f95396f0e',
  'linux-x86': 'b99b7bbd83725e06b2ce6d3935bc7555',
  'windows-x64': 'e9af54b60a3713a98557337dfb0aaedd',
  'windows-x86': '8bf35f5b526cc05cc60e0e538b4722b3'
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