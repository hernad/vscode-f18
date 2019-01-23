'use strict';

export class Constants {
  public static ExtensionId = 'f18-klijent';
  // public static GlobalStateKey = 'postgresql.connections';

  public static PostgresExtensionId = 'postgres';
  public static PostgresGlobalStateKey = 'postgresql.connections';
}

export const revision = '20190122.1';

//   tmp/F18
// 
// F18-linux-x86_20190122.1.zip
//   tmp/F18

// F18-windows-x86_20190122.1.zip
//   tmp/F18.exe
// F18-windows-x64_20190122.1.zip
//   tmp/F18.exe

export const execHashList: any = {
  'linux-x64': '0dae8d0235c15a023e005afa56f72827',
  'linux-x86': '93f0808120051c18f762f164f5b89811',
  'windows-x64': '6a8842721497d68f0003e79198f8a3f4',
  'windows-x86': 'c55fa7723fa2a4bea52831e38db0e220'
};
