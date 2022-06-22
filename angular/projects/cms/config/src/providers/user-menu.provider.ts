import { UserMenuService } from '@abp/ng.theme.shared';
import { APP_INITIALIZER } from '@angular/core';
import { Router } from '@angular/router';
import { eCmsRouteNames } from '../enums';
import { eCmsUserMenus } from '../enums/user-menus.enum';

export const CMS_USER_MENU_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureUserMenu,
    deps: [UserMenuService, Router],
    multi: true,
  },
];

export function configureUserMenu(userMenuService: UserMenuService, router: Router) {
  return () => {
    userMenuService.addItems([
      {
        id: eCmsUserMenus.CmsManagement,
        order: 99,
        textTemplate: {
          text: eCmsRouteNames.Dashboard,
          icon: 'fa fa-cog',
        },
        action: () => {
          router.navigateByUrl('/cms');
        },
      },
    ]);
  };
}