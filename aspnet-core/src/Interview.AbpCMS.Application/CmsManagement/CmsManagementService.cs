using Interview.AbpCMS.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;

namespace Interview.AbpCMS.CmsManagement
{
    [Authorize(AbpCMSPermissions.Page.Default)]
    public class CmsManagementService : ICmsManagementAppService
    {
        public Task<CmsContentDto> CreateCmsContentAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CmsContentDto> GetCmsContentAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CmsContentDto> UpdateCmsContentAsync()
        {
            throw new NotImplementedException();
        }
    }
}
