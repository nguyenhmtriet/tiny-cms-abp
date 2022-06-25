import {
  ABP,
  eLayoutType,
  ListResultDto,
  PagedResultDto,
  RestService,
  RoutesService,
} from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { GetPageContentQuery, PageContentDto } from '../models';

@Injectable()
export class CmsManagementService {
  private readonly apiName = 'AbpCMSManagement';
  constructor(private restService: RestService, private routesService: RoutesService) {}

  addRoute(pageContent: PageContentDto) {
    this.routesService.add([this.createRoute(pageContent)]);
  }

  createRoute(pageContent: PageContentDto): ABP.Route {
    return {
      name: pageContent.title,
      path: `cms/page/${pageContent.id}`,
      layout: eLayoutType.application,
      order: pageContent.order,
      // iconClass: 'fa fa-cogs',
    };
  }

  getLists = () =>
    this.restService.request<any, ListResultDto<PageContentDto>>({
      method: 'GET',
      url: '/api/cms/page-management/lists',
    });

  getPagedList = (query: GetPageContentQuery) =>
    this.restService.request<any, PagedResultDto<PageContentDto>>(
      {
        method: 'GET',
        url: '/api/cms/page-management/page-contents',
        params: {
          sorting: query.sorting || 'order',
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
