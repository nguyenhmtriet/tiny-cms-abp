import { PageModule } from '@abp/ng.components/page';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsDashboardComponent, PageComponent } from './components';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [CmsDashboardComponent, PageComponent, SanitizerPipe],
  imports: [CmsRoutingModule, CoreModule, ThemeSharedModule, PageModule],
  exports: [],
})
export class CmsModule {
  static forChild(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<CmsModule> {
    return new LazyModuleFactory(CmsModule.forChild());
  }
}
