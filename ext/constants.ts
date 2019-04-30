'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190430.1';
const execHashListS: any = {
  'linux-x64': 'c520797d13caa180645fbff01a3b5e0c',
  'linux-x86': 'a97833b55c00572f20d6cc9c4599719f',
  'windows-x64': 'bbcafcdb73668dce51417acce3b37345',
  'windows-x86': '462d331c2dac1c5630cd185c7fcd013e'
};


const revisionE = '20190427.2';
const execHashListE: any = {
  'linux-x64': 'b7540fb4d1f673c24f8e0905a7b13eef',
  'linux-x86': 'ada596c94961b343d51531bb223d6831',
  'windows-x64': '584c99f3dd6c9936e248884b451d9717',
  'windows-x86': '2aca8410a2951ae95c8599dbf9db6c79'
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