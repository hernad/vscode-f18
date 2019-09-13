'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

const revisionS = '20190911.1';
const execHashListS: any = {
  'linux-x64': '0733b27b0533242166d233b274704c4e',
  'linux-x86': '77044aa13f71bec15a3c17f17302f449',
  'windows-x64': '34af5ed5f5f1de87e61257d63ca3d19e',
  'windows-x86': 'bae6ce81080ab45ddd4b33b27ee31e2e'
};

const revisionE = '20190808.1';
const execHashListE: any = {
  'linux-x64': '079c78e56d6fb02eda2474df53b2c997',
  'linux-x86': '2fdd5b6c199b323f3600dd33e7d4fe00',
  'windows-x64': '2680f5d80b4d4083fe74a9b141f299ff',
  'windows-x86': '537d636d3388a2bcdafcefa9a738cc84'
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