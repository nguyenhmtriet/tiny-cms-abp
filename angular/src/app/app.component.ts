import { RoutesService } from '@abp/ng.core';
import { eThemeSharedRouteNames, NavItemsService, UserMenuService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  constructor(
    private navItemsService: NavItemsService,
    private routesService: RoutesService,
    private userMenuService: UserMenuService,
    private router: Router
  ) {
    // this.routesService.remove([eThemeSharedRouteNames.Administration]);
    // this.userMenuService.addItems([
    //   {
    //     id: 'UserMenu.Administration',
    //     order: 101,
    //     textTemplate: {
    //       text: eThemeSharedRouteNames.Administration,
    //       icon: 'fa fa-wrench',
    //     },
    //     action: () => {},

    //   },
    // ]);
  }
}
