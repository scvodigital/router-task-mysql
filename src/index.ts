/* tslint:disable:no-any */
const hbs = require('clayhandlebars')();
import mysql = require('mysql');
import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class MySQLRouterTask extends RouterTask {
  name = 'mysql';

  constructor(
      private connectionConfigs: ConnectionMap,
      handlebarsHelpers: HandlebarsHelpers) {
    super();
    Helpers.register(hbs);
    Object.keys(handlebarsHelpers).forEach((name) => {
      hbs.registerHelper(name, handlebarsHelpers[name]);
    });
  }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    const data: any = {};
    const config = (task.config as MySQLTaskConfig);
    const connectionConfig = this.connectionConfigs[config.connectionName];
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const queryTemplateNames = Object.keys(config.queryTemplates);
    for (let q = 0; q < queryTemplateNames.length; ++q) {
      const queryTemplateName = queryTemplateNames[q];
      const queryTemplate = config.queryTemplates[queryTemplateName];
      try {
        data[queryTemplateName] =
            await this.executeQuery(routeMatch, connection, queryTemplate);
      } catch (err) {
        throw err;
      }
    }

    connection.end();

    return data;
  }

  executeQuery(
      routeMatch: RouteMatch, connection: mysql.Connection,
      queryTemplate: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const template = hbs.compile(queryTemplate);
      const query = template(routeMatch);
      console.log('About to execute query:', query);
      connection.query(query, (error, results, fields) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      });
    });
  }
}

export interface ConnectionMap { [name: string]: mysql.ConnectionConfig; }

export interface MySQLTaskConfig {
  connectionName: string;
  queryTemplates: {[name: string]: string};
}

export interface HandlebarsHelpers { [name: string]: (...args: any[]) => any; }

/* tslint:enable:no-any */
