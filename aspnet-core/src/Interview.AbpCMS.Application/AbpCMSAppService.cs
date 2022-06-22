using System;
using System.Collections.Generic;
using System.Text;
using Interview.AbpCMS.Localization;
using Volo.Abp.Application.Services;

namespace Interview.AbpCMS;

/* Inherit your application services from this class.
 */
public abstract class AbpCMSAppService : ApplicationService
{
    protected AbpCMSAppService()
    {
        LocalizationResource = typeof(AbpCMSResource);
    }
}
