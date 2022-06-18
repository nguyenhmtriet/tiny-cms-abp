using Interview.AbpCMS.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Interview.AbpCMS.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AbpCMSController : AbpControllerBase
{
    protected AbpCMSController()
    {
        LocalizationResource = typeof(AbpCMSResource);
    }
}
