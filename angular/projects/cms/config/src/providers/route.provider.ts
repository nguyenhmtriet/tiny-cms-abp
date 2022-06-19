import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';
import { eCmsRouteNames } from '../enums';

export const CMS_ROUTE_PROVIDERS = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

export function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        name: eCmsRouteNames.Dashboard,
        path: '/cms',
        layout: eLayoutType.application,
        order: 100,
        iconClass: 'fa fa-cogs',
      },
    ]);
  };
}
