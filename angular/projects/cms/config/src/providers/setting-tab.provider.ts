import { APP_INITIALIZER } from '@angular/core';
import { CmsPageGroupComponent } from '../components/cms-page-group/cms-page-group.component';
import { eCmsSettingTabNames } from '../enums/setting-tab-names.enum';
import { CmsSettingsService } from '../services/cms-tabs.service';

export const CMS_SETTING_TAB_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureSettingTabs,
    deps: [CmsSettingsService],
    multi: true,
  },
];

export function configureSettingTabs(cmsSettingsService: CmsSettingsService) {
  return () => {
    cmsSettingsService.add([
      {
        name: eCmsSettingTabNames.MenuPageGroup,
        order: 100,
        requiredPolicy: 'AbpCMSManagement.Pages',
        component: CmsPageGroupComponent,
      },
    ]);
  };
}
