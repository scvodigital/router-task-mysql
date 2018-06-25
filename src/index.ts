/* tslint:disable:no-any */
import {Client, ConfigOptions, MSearchParams, MSearchResponse, SearchResponse} from 'elasticsearch';

const hbs = require('clayhandlebars')();

import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class MySQLRouterTask extends RouterTask {
  name = 'mysql';

  constructor(handlebarsHelpers: HandlebarsHelpers) {
    super();
    Helpers.register(hbs);
    Object.keys(handlebarsHelpers).forEach((name) => {
      hbs.registerHelper(name, handlebarsHelpers[name]);
    });
  }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    let data = {};

    return data;
  }
}

export interface MySQLTaskConfig {
  connectionStringTemplate: string;
  elasticsearchConfig: ConfigOptions;
  queryTemplates: { [name: string]: string } | string;
}

export interface HandlebarsHelpers { [name: string]: (...args: any[]) => any; }

/* tslint:enable:no-any */
