import { CoreModule } from '@abp/ng.core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CmsPageListComponent } from './components/cms-page-list/cms-page-list.component';
import { CMS_SETTING_TAB_PROVIDERS } from './providers';
import { CMS_USER_MENU_PROVIDERS } from './providers/user-menu.provider';
import { CmsSettingsService } from './services';
import { CmsManagementService } from './services/cms-management.service';

@NgModule({
  imports: [
    CoreModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [CmsPageListComponent],
  exports: [CmsPageListComponent],
  providers: [CmsManagementService, CmsSettingsService],
})
export class CmsConfigModule {
  static forRoot(): ModuleWithProviders<CmsConfigModule> {
    return {
      ngModule: CmsConfigModule,
      providers: [CMS_USER_MENU_PROVIDERS, CMS_SETTING_TAB_PROVIDERS],
    };
  }
}
