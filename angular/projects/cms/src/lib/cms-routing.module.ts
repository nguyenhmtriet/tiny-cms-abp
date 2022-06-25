import {
  AuthGuard,
  ReplaceableComponents,
  ReplaceableRouteContainerComponent,
  RouterOutletComponent,
} from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eCmsComponents } from 'projects/cms/config/src/enums/components.enum';
import { CmsDashboardComponent, PageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: RouterOutletComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReplaceableRouteContainerComponent,
        data: {
          requiredPolicy: 'AbpCMSManagement.Pages',
          replaceableComponent: {
            key: eCmsComponents.CmsDashboard,
            defaultComponent: CmsDashboardComponent,
          } as ReplaceableComponents.RouteData,
        },
      },
      {
        path: 'page/:id',
        component: ReplaceableRouteContainerComponent,
        data: {
          replaceableComponent: {
            key: eCmsComponents.Page,
            defaultComponent: PageComponent,
          } as ReplaceableComponents.RouteData,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
