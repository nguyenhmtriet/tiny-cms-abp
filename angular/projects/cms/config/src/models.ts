import { CreationAuditedEntityDto, ExtensibleEntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface PageContentDto extends FullAuditedEntityDto<string> {
  id: string | null;
  title: string;
  content: string;
  publishDate: string;
  author: string;
  order: number;
}

export interface GetPageContentQuery extends PagedAndSortedResultRequestDto {}