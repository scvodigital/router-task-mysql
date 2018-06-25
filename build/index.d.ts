import { RouterTask, RouteMatch, RouteTaskConfiguration } from '@scvo/router';
export declare class MySQLRouterTask extends RouterTask {
    name: string;
    constructor(handlebarsHelpers: HandlebarsHelpers);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
}
export interface MySQLTaskConfig {
    connectionStringTemplate: string;
    queryTemplates: {
        [name: string]: string;
    } | string;
}
export interface HandlebarsHelpers {
    [name: string]: (...args: any[]) => any;
}
