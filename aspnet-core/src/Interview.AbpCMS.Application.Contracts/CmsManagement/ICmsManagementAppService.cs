using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Interview.AbpCMS.CmsManagement
{
    public interface ICmsManagementAppService : IApplicationService
    {
        Task<CmsContentDto> GetCmsContentAsync();
        Task<CmsContentDto> CreateCmsContentAsync();
        Task<CmsContentDto> UpdateCmsContentAsync();
    }
}
