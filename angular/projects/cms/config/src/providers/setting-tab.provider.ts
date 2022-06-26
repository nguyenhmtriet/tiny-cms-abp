import { APP_INITIALIZER } from '@angular/core';
import { CmsPageListComponent } from '../components/cms-page-list/cms-page-list.component';
import { eCmsSettingTabNames } from '../enums/setting-tab-names.enum';
import { CmsSettingsService } from '../services/cms-setting-tabs.service';

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
        component: CmsPageListComponent,
      },
    ]);
  };
}
