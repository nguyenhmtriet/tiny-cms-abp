using System;
using System.Threading;
using System.Threading.Tasks;

namespace Interview.AbpCMS.PageManagement;

public interface IPageManagementDomain
{
    Task<PageContent> CreateAsync(
        string title,
        string content,
        string author,
        DateTime publishDate,
        CancellationToken cancellationToken);
}
