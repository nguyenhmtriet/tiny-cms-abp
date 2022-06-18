using Interview.AbpCMS.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Interview.AbpCMS;

[DependsOn(
    typeof(AbpCMSEntityFrameworkCoreTestModule)
    )]
public class AbpCMSDomainTestModule : AbpModule
{

}
