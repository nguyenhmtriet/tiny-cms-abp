import {
  ABP,
  ListService,
  LocalizationService,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
  RoutesService,
} from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorDefaultOptions, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class CmsPageListComponent implements OnInit, OnDestroy {
  private pageChanges$ = new Subject<{
    prev?: PageContentDto;
    current?: PageContentDto;
  }>();
  private destroy$ = new Subject<boolean>();

  paginatorOpts: MatPaginatorDefaultOptions = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
  };
  data: PagedResultDto<PageContentDto> = { items: [], totalCount: 0 };
  columns: string[] = ['actions', 'title', 'author', 'publishDate', 'order'];
  title = eCmsSettingTabNames.MenuPageGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public listService: ListService<PagedAndSortedResultRequestDto>,
    private service: CmsManagementService,
    private confirmationService: ConfirmationService,
    private localizationService: LocalizationService,
    private toaster: ToasterService,
    private routesService: RoutesService,
    public dialog: MatDialog
  ) {
    this.listService
      .hookToQuery(query =>
        this.service.getPagedList({
          skipCount: this.paginator.pageSize * this.paginator.pageIndex,
          maxResultCount: this.paginator.pageSize,
          sorting:
            this.listService.sortKey && `${this.listService.sortKey} ${this.listService.sortOrder}`,
        })
      )
      .subscribe(res => {
        this.data = {
          totalCount: res.totalCount,
          items: res.items.map(i => {
            const publishDate = moment(i.publishDate);
            return {
              ...i,
              publishDate: publishDate?.format('YYYY MMMM DD'),
            };
          }),
        };
      });

    this.pageChanges$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(changes => {
        if (!changes.current && !changes.prev) {
          return;
        }

        let currentRoutes = this.routesService.flat.filter(route =>
          route.path?.startsWith('cms/page')
        );

        // CREATE NEWLY
        if (!changes.prev && !!changes.current) {
          currentRoutes.push(this.service.createRoute(changes.current));
        }

        // UPDATE || Soft Delete
        if (!!changes.prev && !!changes.current) {
          currentRoutes = this.updateOrSoftDeleteRoute(
            changes.prev,
            changes.current,
            currentRoutes
          );
          this.refreshRoutes(currentRoutes);
          return;
        }

        // DELETE
        if (!!changes.prev && !changes.current) {
          currentRoutes = currentRoutes.filter(r => r.name !== changes.prev.title);
        }

        this.refreshRoutes(currentRoutes);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  changePage(pageEvent: PageEvent) {
    this.listService.page = pageEvent.pageIndex;
    this.listService.maxResultCount = pageEvent.pageSize;
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
          this.pageChanges$.next({ prev: null, current: result });
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
          this.pageChanges$.next({ prev: pageContent, current: result });
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
          this.pageChanges$.next({ prev: pageContent, current: null });
        });
      });
  }

  private updateOrSoftDeleteRoute(
    prev: PageContentDto,
    current: PageContentDto,
    currentRoutes: ABP.Route[]
  ) {
    let route = currentRoutes.find(r => r.name === prev.title);

    // already deleted so it's not existed in routes
    if (!route) {
      // enabled it back
      route = this.service.createRoute(current);
      currentRoutes.push(route);
    }

    if (current.isDeleted) {
      this.routesService.remove([prev.title]);
      currentRoutes = currentRoutes.filter(r => r.name !== prev.title);
    } else {
      route.name = current.title;
    }

    return currentRoutes;
  }

  private refreshRoutes(routes: ABP.Route[]) {
    routes = routes.sort((a, b) => a.order - b.order);
    this.routesService.remove(routes.map(route => route.name));
    this.routesService.add(routes);
  }
}
