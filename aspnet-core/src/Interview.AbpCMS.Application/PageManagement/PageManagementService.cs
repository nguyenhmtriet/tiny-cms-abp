using Interview.AbpCMS.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace Interview.AbpCMS.PageManagement;

[Authorize(AbpCMSPermissions.Page.Default)]
public class PageManagementService : AbpCMSAppService, IPageManagementAppService
{
    private readonly IPageManagementRepository _pageMgmtRepository;
    private readonly IPageManagementDomain _pageMgmtDomain;
    private readonly ILogger<PageManagementService> _logger;

    public PageManagementService(
        IPageManagementRepository repository,
        IPageManagementDomain pageManagementDomain,
        ILogger<PageManagementService> logger
        ) : base()
    {
        _pageMgmtRepository = repository;
        _pageMgmtDomain = pageManagementDomain;
        _logger = logger;
    }

    [AllowAnonymous]
    public async Task<ListResultDto<PageContentDto>> GetAllLists(CancellationToken ct)
    {
        var pageContents = await _pageMgmtRepository.GetListAsync(p => p.IsDeleted == false, false, ct);

        return new ListResultDto<PageContentDto>(
            ObjectMapper.Map<List<PageContent>, List<PageContentDto>>(pageContents)
        );
    }

    public async Task<PageContentDto> GetPageContentAsync(Guid id, CancellationToken ct)
    {
        var pageContent = await _pageMgmtRepository.GetAsync(id);

        return ObjectMapper.Map<PageContent, PageContentDto>(pageContent);
    }

    public async Task<PagedResultDto<PageContentDto>> GetPageContentsAsync(GetPageContentQuery query, CancellationToken ct)
    {
        var pageContents = await _pageMgmtRepository.GetPagedListAsync(query.SkipCount, query.MaxResultCount, query.Sorting, false, ct);
        if (pageContents == null || !pageContents.Any())
        {
            return new PagedResultDto<PageContentDto>(0, new PageContentDto[] { });
        }

        var totalCount = await _pageMgmtRepository.GetCountAsync();
        return new PagedResultDto<PageContentDto>(
            totalCount,
            ObjectMapper.Map<List<PageContent>, List<PageContentDto>>(pageContents)
            );
    }

    public async Task<PageContentDto> CreatePageContentAsync(CreatePageContentDto createPageContentDto, CancellationToken ct)
    {
        try
        {
            var pageContent = await _pageMgmtDomain.CreateAsync(
                createPageContentDto.Title,
                createPageContentDto.Content,
                createPageContentDto.Author,
                createPageContentDto.PublishDate,
                createPageContentDto.Order,
                ct);

            await _pageMgmtRepository.InsertAsync(pageContent, true, ct);
            return ObjectMapper.Map<PageContent, PageContentDto>(pageContent);
        }
        catch (PageManagementException ex)
        {
            _logger.LogError($"Page title '{createPageContentDto.Title}' has been existed");
            throw ex;
        }
    }

    public async Task<PageContentDto> UpdatePageContentAsync(UpdatePageContentDto updatePageContentDto, CancellationToken ct)
    {
        try
        {
            var pageContent = await _pageMgmtRepository.FindAsync(pc => pc.Id == updatePageContentDto.Id, cancellationToken: ct);

            if (pageContent == null)
            {
                throw new EntityNotFoundException();
            }

            pageContent.Title = updatePageContentDto.Title;
            pageContent.Content = updatePageContentDto.Content;
            pageContent.Author = updatePageContentDto.Author;
            pageContent.PublishDate = updatePageContentDto.PublishDate;
            pageContent.IsDeleted = updatePageContentDto.IsDeleted;
            pageContent.Order = updatePageContentDto.Order;

            //pageContent.LastModificationTime = DateTime.UtcNow;

            await _pageMgmtRepository.UpdateAsync(pageContent, true, ct);
            return ObjectMapper.Map<PageContent, PageContentDto>(pageContent);
        }
        catch (PageManagementException ex)
        {
            _logger.LogError($"PageContent's Id {updatePageContentDto.Id} of title '{updatePageContentDto.Title}' is not found");
            throw ex;
        }
    }

    public async Task<PageContentDto> HandleInsertOrUpdatePageContentAsync(CreateOrUpdatePageContentDto pageContentDto, CancellationToken ct)
    {
        if (pageContentDto.Id != null)
        {
            return await UpdatePageContentAsync(new UpdatePageContentDto
            {
                Id = pageContentDto.Id.Value,
                Title = pageContentDto.Title,
                Author = pageContentDto.Author,
                PublishDate = pageContentDto.PublishDate,
                IsDeleted = pageContentDto.IsDeleted,
                Content = pageContentDto.Content,
                Order = pageContentDto.Order,
            }, ct);
        }

        return await CreatePageContentAsync(new CreatePageContentDto
        {
            Title = pageContentDto.Title,
            Author = pageContentDto.Author,
            PublishDate = pageContentDto.PublishDate,
            Content = pageContentDto.Content,
            Order = pageContentDto.Order,
        }, ct);
    }

    public async Task<PageContentDto> DeletePageContentAsync(Guid id, CancellationToken ct)
    {
        var pageContent = await _pageMgmtRepository.FindAsync(pc => pc.Id == id, cancellationToken: ct);

        if (pageContent == null)
        {
            throw new EntityNotFoundException();
        }

        await _pageMgmtRepository.DeleteAsync(id, true, ct);
        return ObjectMapper.Map<PageContent, PageContentDto>(pageContent);
    }
}
