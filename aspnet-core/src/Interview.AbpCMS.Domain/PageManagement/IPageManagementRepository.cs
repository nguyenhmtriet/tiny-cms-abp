using System;
using Volo.Abp.Domain.Repositories;

namespace Interview.AbpCMS.PageManagement;

public interface IPageManagementRepository : IRepository<PageContent, Guid>
{

}
