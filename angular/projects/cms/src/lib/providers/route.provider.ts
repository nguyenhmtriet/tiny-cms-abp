import { eLayoutType, RoutesService } from '@abp/ng.core';

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
