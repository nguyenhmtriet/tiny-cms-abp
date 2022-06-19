import { PageModule } from '@abp/ng.components/page';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { CmsDashboardComponent } from './components';

@NgModule({
  declarations: [CmsDashboardComponent],
  imports: [CoreModule, ThemeSharedModule, PageModule],
  exports: [],
})
export class CmsModule {}
