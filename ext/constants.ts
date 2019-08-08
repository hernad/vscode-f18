'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190808.1';
const execHashListS: any = {
  'linux-x64': '079c78e56d6fb02eda2474df53b2c997',
  'linux-x86': '2fdd5b6c199b323f3600dd33e7d4fe00',
  'windows-x64': '2680f5d80b4d4083fe74a9b141f299ff',
  'windows-x86': '537d636d3388a2bcdafcefa9a738cc84'
};

const revisionE = '20190716.2';
const execHashListE: any = {
  'linux-x64': 'b688bae1426a63443dd855b640f6046e',
  'linux-x86': '358bc6c051029bea97303a586404d78c',
  'windows-x64': '5a66007d223ba472f8cfc85f6c00eb58',
  'windows-x86': '2aba042fa604c24230647d8df221d776'
};

const revisionX = '20190705.3';
const execHashListX: any = {
  'linux-x64': '927683d68d3b691e0503d3d1c2cd6da4',
  'linux-x86': '1dad6287e672e424618dbab60998da7b',
  'windows-x64': 'e41f6e6825a357c370238f5c580d3aa7',
  'windows-x86': '3478d238cc5eca003fc6ee1343027ec2'
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