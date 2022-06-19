import {
  AuthGuard,
  ReplaceableComponents,
  ReplaceableRouteContainerComponent,
  RouterOutletComponent,
} from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eCmsComponents } from 'projects/cms/config/src/enums/components.enum';
import { CmsDashboardComponent } from './components';

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
          requiredPolicy: 'Cms.PageGroup',
          replaceableComponent: {
            key: eCmsComponents.CmsDashboard,
            defaultComponent: CmsDashboardComponent,
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
