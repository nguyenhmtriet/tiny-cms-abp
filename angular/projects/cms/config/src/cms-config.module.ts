import { CoreModule } from '@abp/ng.core';
import { EllipsisModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { QuillModule } from 'ngx-quill';
import { CmsPageDetailComponent } from './components/cms-page-detail/cms-page-detail.component';
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
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EllipsisModule,
    QuillModule.forRoot(),
  ],
  declarations: [CmsPageListComponent, CmsPageDetailComponent],
  exports: [CmsPageListComponent],
  providers: [
    CmsManagementService,
    CmsSettingsService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'YYYY MMMM DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class CmsConfigModule {
  static forRoot(): ModuleWithProviders<CmsConfigModule> {
    return {
      ngModule: CmsConfigModule,
      providers: [CMS_USER_MENU_PROVIDERS, CMS_SETTING_TAB_PROVIDERS],
    };
  }
}
