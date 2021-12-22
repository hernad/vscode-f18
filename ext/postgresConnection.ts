// import * as vscode from 'vscode';

import { IConnection } from './IConnection';
import { window } from 'vscode';
// import PostgreSQLLanguageClient from '../language/client';
import { Global } from './global';
import { Constants } from './constants';
import { Database, PgClient } from './database';


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
      let conn: PgClient;
      let databases: string[] = [];
      try {
        conn = await Database.createConnection(connection, 'postgres');
        const res = await conn.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
        databases = res.rows.map<string>(database => database.datname);
        if (databases.indexOf(defaultDatabase)) {
          connection = Database.getConnectionWithDB(connection, defaultDatabase);
        }
      } catch {
        console.log('error');
        connection = undefined;
      } finally {
        if (conn)
           await conn.end();
      }

    }


    // console.log(`get default connection ${connection.database}`);
    return connection;

  }

  static createPromiseCheckConnection(tries: number) : Promise<number> {
    return new Promise(async function callback(resolve, reject) {
      //console.log(tries + ' remaining');
      let conn: IConnection = await PostgresConnection.getDefaultConnection();
      //  .then()
      //  .catch();
  
      if (conn && conn.database) {
         resolve(tries);
         return;
      }
      
      if (--tries > 0) {
        window.showErrorMessage(`PostgreSQL error ${7-tries}/7`);
        setTimeout(function() {
          callback(resolve, reject);
        }, 3000);
      } else {
          reject(tries * -1);
          return;
      }
    });
  }

  public static async checkConnection(): Promise<number> {

    let ret : number;

    // This one will try to get connection 5 times
    await PostgresConnection.createPromiseCheckConnection(7)
      .then( (r: number ) => ret = r)
      .catch( (r: number) => ret = r);
  
    return ret;
  }


}