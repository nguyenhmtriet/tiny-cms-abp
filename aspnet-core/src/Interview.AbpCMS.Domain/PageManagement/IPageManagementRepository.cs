using System;
using Volo.Abp.Domain.Repositories;

namespace Interview.AbpCMS.PageManagement;

public interface IPageManagementRepository : IBasicRepository<PageContent, Guid>, IRepository<PageContent, Guid>
{

}
