import mysql = require('mysql');
import { RouterTask, RouteMatch, RouteTaskConfiguration } from '@scvo/router';
export declare class MySQLRouterTask extends RouterTask {
    private connectionConfigs;
    name: string;
    constructor(connectionConfigs: ConnectionMap, handlebarsHelpers: HandlebarsHelpers);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
    executeQuery(routeMatch: RouteMatch, connection: mysql.Connection, queryTemplate: string): Promise<any>;
}
export interface ConnectionMap {
    [name: string]: mysql.ConnectionConfig;
}
export interface MySQLTaskConfig {
    connectionName: string;
    queryTemplates: {
        [name: string]: string;
    };
}
export interface HandlebarsHelpers {
    [name: string]: (...args: any[]) => any;
}
