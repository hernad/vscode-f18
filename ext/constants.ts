'use strict';
import * as vscode from 'vscode';
import { Helper } from './helper';
import { exec } from 'child_process';

export class Constants {
  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

// back na najstariju koja radi
// F18-windows-x64_4.23.36.zip
// f6e447707d8598de35a2d1c66ccfaadb  tmp/F18-klijent.exe
// F18-windows-x86_4.23.36.zip
// c58603b7df6a3bbe7b987c1faab97d56  tmp/F18-klijent.exe

// F18-linux-x64_4.23.41.zip
// F18-windows-x64_4.23.41.zip
// 6e9436c1a259c4d5397a8690613c0036  tmp/F18-klijent.exe
// F18-windows-x86_4.23.41.zip
// 32f4e15b847753b73f84c587b59ebd31  tmp/F18-klijent.exe

const revisionS = '4.24.42';
const execHashListS: any = {
  'linux-x64': '8ba7afe76115c65da0d846a76e9c9f3b',

  'windows-x64': '0',
  'windows-x64-prev': '66896a8f50b5af32eb90b7d63bc7caa5',
  'windows-x64-prev-rev': '4.24.1',

  'windows-x86': '0',
  'windows-x86-prev': '32f4e15b847753b73f84c587b59ebd31',
  'windows-x86-prev-rev': '4.23.41',
};



/*
const revisionS = '4.23.49';
const execHashListS: any = {
  'linux-x64': 'ad7344a1fe96a16493514b117d96b392',
  'windows-x64': '0',
  'windows-x64-prev': '0ca351cc631a8b569dd651081da0cde7',
  'windows-x64-prev-rev': '4.23.48',
  'windows-x86': '0',
  'windows-x86-prev': '32f4e15b847753b73f84c587b59ebd31',
  'windows-x86-prev-rev': '4.23.41',
};
*/


/*
const revisionS = '4.23.43';
const execHashListS: any = {
  'linux-x64': '4a76831a18eaf5aa20068bd321d0546f',

  'windows-x64': '0',
  'windows-x64-prev': '6e9436c1a259c4d5397a8690613c0036',
  'windows-x64-prev-rev': '4.23.41',

  'windows-x86': '0',
  'windows-x86-prev': '32f4e15b847753b73f84c587b59ebd31',
  'windows-x86-prev-rev': '4.23.41',
};
*/


/*
const revisionS = '4.23.15';
const execHashListS: any = {
  'linux-x64': '0',
  'linux-x64-prev' : '002aa51b67b081873e067dc8cda1dedf',
  'linux-x64-prev-rev': '4.23.4',

  'windows-x64': '36a414797d8b71baca73aeb5cdf7400b',
  'windows-x86': '513c20c33d326f0be3ab9f95de7f34aa',
};
*/

const revisionE = '4.23.12';
const execHashListE: any = {
  'linux-x64': '0',
  'linux-x64-prev' : '002aa51b67b081873e067dc8cda1dedf',
  'linux-x64-prev-rev': '4.23.4',

  'windows-x64': '8745ef4800f6694bd63add286a87b35d',
  'windows-x86': '1440c7dc0088bd7e7f4d9136bd05b854',
};



/*
const revisionE = '4.23.1';
const execHashListE: any = {
  'linux-x64': '472b86108c70dba80805cd64f0861bf1',

  'windows-x64': '0',
  'windows-x64-prev': 'd91d50009d53c80e3a5081bd65c6fa5f',
  'windows-x64-prev-rev': '4.22.96',

  'windows-x86': '0',
  'windows-x86-prev': 'fc0efc2482e57139a5491b85b00a229f',
  'windows-x86-prev-rev': '4.22.96',
};
*/

const revisionX = '4.22.84';
const execHashListX: any = {
  'linux-x64': '0',
  'linux-x64-prev' : 'f0ef32d054e694b2026256543dee3adb',
  'linux-x64-prev-rev': '4.22.72',

  'windows-x64': '1be028563de8ca64c48c9c0da2d706aa',
  'windows-x86': '89d8caf83fa1561106921445b664dd78',
};



/*
const revisionX = '4.22.72';
const execHashListX: any = {
  'linux-x64': 'f0ef32d054e694b2026256543dee3adb',
  'windows-x64': '0',
  'windows-x86': '0',

  'windows-x64-prev': 'c5ca0cccfa3fff0668187e885089d222',
  'windows-x64-prev-rev': '4.22.64',

  'windows-x86-prev': '5f2ca84c5b61df1072d73cfc3a02912a',
  'windows-x86-prev-rev': '4.22.64'
};
*/



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