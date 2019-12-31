'use strict';
import * as vscode from 'vscode';
export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

// F18-linux-x64_4.21.8.zip
// 69a79475911481614961efe7f3452b3d  tmp/F18-klijent
// F18-windows-x64_4.21.8.zip
// 4c18c67d706c8009b42d85f3166b4434  tmp/F18-klijent.exe
// F18-windows-x86_4.21.8.zip
// 14dfcb27c6c31f3e8a1720c9b78229f6  tmp/F18-klijent.exe

const revisionS = '4.21.8';
const execHashListS: any = {
  'linux-x64': '69a79475911481614961efe7f3452b3d',
  'windows-x64': '4c18c67d706c8009b42d85f3166b4434',
  'windows-x86': '14dfcb27c6c31f3e8a1720c9b78229f6'
};

const revisionE = '20191122.2';
const execHashListE: any = {
  'linux-x64': '0c4ab5f6c38c8b334a8821026b49979a',
  'windows-x64': 'aa33c731178f878457ea3287dbdeb4c2',
  'windows-x86': '5316ec85a433d8e773d2dc06aa92615b'
};

const revisionX = '20190911.1';
const execHashListX: any = {
  'linux-x64': '0733b27b0533242166d233b274704c4e',
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