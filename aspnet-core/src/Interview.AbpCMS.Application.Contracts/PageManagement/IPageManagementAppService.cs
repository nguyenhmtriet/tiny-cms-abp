using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Interview.AbpCMS.PageManagement;

public interface IPageManagementAppService : IApplicationService
{
    Task<PageContentDto> GetPageContentAsync(Guid id, CancellationToken ct);
    Task<PagedResultDto<PageContentDto>> GetPageContentsAsync(GetPageContentQuery input, CancellationToken ct);
    Task<PageContentDto> HandleInsertOrUpdatePageContentAsync(CreateOrUpdatePageContentDto pageContentDto, CancellationToken ct);
    Task<PageContentDto> CreatePageContentAsync(CreatePageContentDto createPageContentDto, CancellationToken ct);
    Task<PageContentDto> UpdatePageContentAsync(UpdatePageContentDto updatePageContentDto, CancellationToken ct);
}
