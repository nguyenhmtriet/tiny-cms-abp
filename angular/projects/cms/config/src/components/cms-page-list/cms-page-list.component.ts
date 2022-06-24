import {
  ListService,
  LocalizationService,
  PagedAndSortedResultRequestDto,
  PagedResultDto
} from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import moment from 'moment';
import { eCmsSettingTabNames } from '../../enums/setting-tab-names.enum';
import { PageContentDto } from '../../models';
import { CmsManagementService } from '../../services';
import { CmsPageDetailComponent } from '../cms-page-detail/cms-page-detail.component';

@Component({
  selector: 'lib-cms-page-list',
  templateUrl: './cms-page-list.component.html',
  styleUrls: ['./cms-page-list.component.css'],
  providers: [ListService],
})
export class CmsPageListComponent implements OnInit {
  data: PagedResultDto<PageContentDto> = { items: [], totalCount: 0 };
  columns: string[] = ['actions', 'title', 'author', 'publishDate'];

  public title = eCmsSettingTabNames.MenuPageGroup;

  constructor(
    public listService: ListService<PagedAndSortedResultRequestDto>,
    private service: CmsManagementService,
    private confirmationService: ConfirmationService,
    private localizationService: LocalizationService,
    private toaster: ToasterService,
    public dialog: MatDialog
  ) {
    this.listService
      .hookToQuery(query => this.service.getPagedList(query))
      .subscribe(
        res =>
          (this.data = {
            totalCount: res.totalCount,
            items: res.items.map(i => {
              const publishDate = moment(i.publishDate);
              return {
                ...i,
                publishDate: publishDate?.format("YYYY MMMM DD"),
              };
            }),
          })
      );
  }

  ngOnInit(): void {}

  changePage(pageEvent: PageEvent) {
    this.listService.page = pageEvent.pageIndex;
  }

  changeSort(sort: Sort) {
    this.listService.sortKey = sort.active;
    this.listService.sortOrder = sort.direction;
  }

  create() {
    const dialogRef = this.dialog.open<CmsPageDetailComponent, PageContentDto, PageContentDto>(
      CmsPageDetailComponent,
      {
        disableClose: true,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createOrUpdate(result).subscribe(() => {
          this.toaster.success({
            key: '::SuccessfullyCreated',
            defaultValue: 'Successfully created',
          });
          this.listService.get();
        });
      }
    });
  }

  edit(id: string) {
    this.service.get(id).subscribe(pageContent => {
      const dialogRef = this.dialog.open<CmsPageDetailComponent, any, PageContentDto>(
        CmsPageDetailComponent,
        {
          data: {
            ...pageContent,
            publishDate: moment(pageContent?.publishDate),
          },
          disableClose: true,
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }

        result.id = id;
        this.service.createOrUpdate(result).subscribe(() => {
          this.toaster.success({
            key: '::SuccessfullyUpdated',
            defaultValue: 'Successfully updated',
          });
          this.listService.get();
        });
      });
    });
  }
  delete(pageContent: PageContentDto) {
    this.confirmationService
      .warn(
        this.localizationService.instant(
          '::ItemWillBeDeletedMessageWithFormat',
          `"${pageContent.title}"`
        ),
        { key: '::AreYouSure', defaultValue: 'Are you sure?' }
      )
      .subscribe((status: Confirmation.Status) => {
        if (status !== Confirmation.Status.confirm) {
          return;
        }

        this.service.delete(pageContent).subscribe(res => {
          this.toaster.success({
            key: '::SuccessfullyDeleted',
            defaultValue: 'Successfully deleted',
          });
          this.listService.get();
        });
      });
  }
}
