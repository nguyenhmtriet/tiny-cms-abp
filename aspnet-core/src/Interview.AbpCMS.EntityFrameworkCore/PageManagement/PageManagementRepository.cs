using Interview.AbpCMS.EntityFrameworkCore;
using System;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Interview.AbpCMS.PageManagement
{
    internal class PageManagementRepository : EfCoreRepository<AbpCMSDbContext, PageContent, Guid>, IPageManagementRepository
    {
        public PageManagementRepository(IDbContextProvider<AbpCMSDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
