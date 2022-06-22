import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { eCmsSettingTabNames } from '../../enums/setting-tab-names.enum';
import { PageContentDto } from '../../models';
import { CmsManagementService } from '../../services';

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
    public dialog: MatDialog
  ) {
    this.listService
      .hookToQuery(query => this.service.getPagedList(query))
      .subscribe(
        res =>
          (this.data = {
            totalCount: res.totalCount,
            items: res.items.map(i => {
              const publishDate = new Date(i.publishDate);
              return {
                ...i,
                publishDate: `${publishDate?.getFullYear()}-${
                  publishDate?.getMonth() + 1
                }-${publishDate?.getDate()}`,
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

  createBook() {
    // const dialogRef = this.dialog.open(BookDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.bookService.create(result).subscribe(() => {
    //       this.listService.get();
    //     });
    //   }
    // });
  }

  editBook(id: any) {
    // this.bookService.get(id).subscribe(book => {
    //   const dialogRef = this.dialog.open(BookDialogComponent, {
    //     data: book,
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.bookService.update(id, result).subscribe(() => {
    //         this.listService.get();
    //       });
    //     }
    //   });
    // });
  }
  deleteBook(id: string) {
    // const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   data: {
    //     title: '::AreYouSure',
    //     description: '::AreYouSureToDelete',
    //   },
    // });
    // confirmationDialogRef.afterClosed().subscribe(confirmationResult => {
    //   if (confirmationResult) {
    //     this.bookService.delete(id).subscribe(() => this.listService.get());
    //   }
    // });
  }
}
