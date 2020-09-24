'use strict';
import * as vscode from 'vscode';
import { Helper } from './helper';
import { exec } from 'child_process';

export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}


const revisionS = '4.22.73';
const execHashListS: any = {
  'linux-x64': '0',
  'linux-x64-prev' : 'f0ef32d054e694b2026256543dee3adb',
  'linux-x64-prev-rev': '4.22.72',

  'windows-x64': '17355cd38e71135c164390e9dd621e40',
  'windows-x86': '026914b3656db7d5c9eafa1f42f05bbc',
};


const revisionE = '4.22.72';
const execHashListE: any = {
  'linux-x64': 'f0ef32d054e694b2026256543dee3adb',
  'windows-x64': '0',
  'windows-x86': '0',

  'windows-x64-prev': 'c5ca0cccfa3fff0668187e885089d222',
  'windows-x64-prev-rev': '4.22.64',

  'windows-x86-prev': '5f2ca84c5b61df1072d73cfc3a02912a',
  'windows-x86-prev-rev': '4.22.64'
};


const revisionX = '4.22.60';
const execHashListX: any = {
  'linux-x64': '56bf82507de44aa0261400060c32404b',
  'windows-x64': '0193afc4af06c5c922141d3b4a2e4b3b',
  'windows-x86': '8f57d6bd6b725efaeb96f7f59009c1a8'
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

// versionChannel = 'S' => rev = '4.66.22';
let rev = revisionAll[versionChannel];
// versionChannel = 'S' => execHashLst = { 'linux-x64': 'hash01', 'windows-x64': '0', 'windows-x86': '0'}
let execHashLst = execHashListAll[versionChannel]

if (execHashLst[Helper.os_platform()] === '0') {
  //  4.22.62 postoji samo linux verzija
  //  
  //  const revisionS = '4.22.62';
  //  const execHashListS: any = {
  //    'linux-x64': '43b564e0a1e549c589884b64bd2defd8',
  //    'windows-x64': '0',
  //    'windows-x86': '0',
  //  
  //    #za windows-x64 i windows-x86 koristiti 4.22.60
  //
  //    'windows-x64-prev': '0193afc4af06c5c922141d3b4a2e4b3b',
  //    'windows-x64-prev-rev': '4.22.60',
  //  
  //    'windows-x86-prev': '8f57d6bd6b725efaeb96f7f59009c1a8',
  //    'windows-x86-prev-rev': '4.22.60'
  //  };

  console.log(`Za ${Helper.os_platform()} verzija ${rev} ne postoji`);
  // za npr windows-x64 nije definisan, uzeti predhodne verzije
  //   windows-x64-prev, windows-x64-prev-rel
  rev = execHashLst[Helper.os_platform() + '-prev-rev'];
  execHashLst[Helper.os_platform()] = execHashLst[Helper.os_platform() + '-prev'];
  console.log(`... koristi se verzija ${rev} hash ${execHashLst[Helper.os_platform()]}`);
}

export const revision = rev;
export const execHashList = execHashLst;