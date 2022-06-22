import { ExtensibleEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface PageContentDto extends ExtensibleEntityDto<string> {
  id: string | null;
  title: string;
  content: string;
  publishDate: string;
  author: string;
  isDeleted: boolean;
  deletionTime: string | null;
  creationTime: string;
  lastModificationTime: string | null;
}

export interface GetPageContentQuery extends PagedAndSortedResultRequestDto {}