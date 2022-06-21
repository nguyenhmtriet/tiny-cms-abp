using Interview.AbpCMS.Localization;
using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Services;
using Volo.Abp.Localization;

namespace Interview.AbpCMS.PageManagement
{
    public class PageManagementDomain : DomainService, IPageManagementDomain
    {
        private readonly IPageManagementRepository _repository;
        public PageManagementDomain(IPageManagementRepository repository) : base()
        {
            _repository = repository;
        }

        public async Task<PageContent> CreateAsync(string title, string content, string author, DateTime publishDate, CancellationToken cancellationToken)
        {
            var existingPage = await _repository.FindAsync(p => p.Title == title, cancellationToken: cancellationToken);
            if (existingPage != null)
            {
                throw new PageManagementException(title, AbpCMSDomainErrorCodes.EXISTED);
            }

            return new PageContent(
                title,
                content,
                author,
                publishDate
            );
        }
    }
}
