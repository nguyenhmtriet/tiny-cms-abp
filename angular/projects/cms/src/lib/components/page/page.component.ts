import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CmsManagementService } from 'cms/config';
import { PageContentDto } from 'projects/cms/config/src/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  pageContent: PageContentDto;

  constructor(
    private cmsManagementService: CmsManagementService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.cmsManagementService.get(params.id).subscribe(res => (this.pageContent = res));
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {}
}
