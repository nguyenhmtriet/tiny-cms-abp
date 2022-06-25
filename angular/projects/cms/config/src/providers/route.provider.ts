import { APP_INITIALIZER } from '@angular/core';
import { map } from 'rxjs/operators';
import { CmsManagementService } from '../services/cms-management.service';

export const CMS_ROUTE_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureRoutes,
    deps: [CmsManagementService],
    multi: true,
  },
];

export function configureRoutes(cmsManagementService: CmsManagementService) {
  return () => {
    return cmsManagementService.getLists().pipe(
      map(res => {
        if (!res || !res.items) {
          return;
        }

        res.items
          .sort((a, b) => a.order - b.order)
          .map(item => {
            cmsManagementService.addRoute(item);
          });
      })
    );
  };
}
