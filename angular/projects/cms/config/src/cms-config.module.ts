import { CoreModule } from '@abp/ng.core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CmsPageGroupComponent } from './components/cms-page-group/cms-page-group.component';
import { CMS_ROUTE_PROVIDERS, CMS_SETTING_TAB_PROVIDERS } from './providers';

@NgModule({
  imports: [CoreModule],
  declarations: [CmsPageGroupComponent],
  exports: [CmsPageGroupComponent],
  providers: [],
})
export class CmsConfigModule {
  static forRoot(): ModuleWithProviders<CmsConfigModule> {
    return {
      ngModule: CmsConfigModule,
      providers: [CMS_ROUTE_PROVIDERS, CMS_SETTING_TAB_PROVIDERS],
    };
  }
}
