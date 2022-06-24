import { PagedResultDto, RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { GetPageContentQuery, PageContentDto } from '../models';

@Injectable()
export class CmsManagementService {
  private readonly apiName = 'AbpCMSManagement';
  constructor(private restService: RestService) {}

  getPagedList = (query: GetPageContentQuery) =>
    this.restService.request<any, PagedResultDto<PageContentDto>>(
      {
        method: 'GET',
        url: '/api/cms/page-management/page-contents',
        params: {
          sorting: query.sorting || 'title',
          skipCount: query.skipCount,
          maxResultCount: query.maxResultCount,
        },
      },
      { apiName: this.apiName }
    );

  get = (id: string) =>
    this.restService.request<any, PageContentDto>(
      {
        method: 'GET',
        url: `/api/cms/page-management/${id}/page-content`,
      },
      { apiName: this.apiName }
    );

  createOrUpdate = (result: PageContentDto) =>
    this.restService.request<any, PageContentDto>(
      {
        method: 'POST',
        url: '/api/cms/page-management/handle-insert-or-update-page-content',
        body: result,
      },
      { apiName: this.apiName }
    );

  delete = (result: PageContentDto) =>
    this.restService.request<any, PageContentDto>(
      {
        method: 'DELETE',
        url: `/api/cms/page-management/${result.id}/page-content`,
      },
      { apiName: this.apiName }
    );
}
