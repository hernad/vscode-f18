// import * as vscode from 'vscode';

import { IConnection } from './IConnection';

// import PostgreSQLLanguageClient from '../language/client';
import { Global } from './global';
import { Constants } from './constants';
import { Database } from './database';

export class PostgresConnection {

  public static async getDefaultConnection(sufix?: string): Promise<IConnection> {

    let defaultConnection = Global.PostgresConfiguration.get<string>("defaultConnection");
    if (!defaultConnection) return null;

    if (sufix)
      defaultConnection += '_' + sufix;

    let connections = Global.contextPostgres.globalState.get<{ [key: string]: IConnection }>(Constants.PostgresGlobalStateKey);
    if (!connections) connections = {};

    let connection: IConnection = null;
    for (const k in connections) {
      if (connections.hasOwnProperty(k)) {
        let connFound = (k === defaultConnection);
        if (!connFound) {
          let connName = connections[k].label || connections[k].host;
          connFound = (connName === defaultConnection);
        }

        if (connFound) {
          connection = Object.assign({}, connections[k]);
          if (connection.hasPassword || !connection.hasOwnProperty('hasPassword')) {
            connection.password = await Global.keytar.getPassword(Constants.PostgresExtensionId, k);
          }
          break;
        }
      }
    }

    let defaultDatabase = Global.PostgresConfiguration.get<string>("defaultDatabase");

    if (defaultDatabase) {
      const conn = await Database.createConnection(connection, 'postgres');

      let databases: string[] = [];
      try {
        const res = await conn.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
        databases = res.rows.map<string>(database => database.datname);
      } finally {
        await conn.end();
      }

      if (databases.indexOf(defaultDatabase)) {
        connection = Database.getConnectionWithDB(connection, defaultDatabase);
      }
    }


    // console.log(`get default connection ${connection.database}`);
    return connection;

  }


}