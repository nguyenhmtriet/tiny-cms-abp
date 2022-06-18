using Volo.Abp.Modularity;

namespace Interview.AbpCMS;

[DependsOn(
    typeof(AbpCMSApplicationModule),
    typeof(AbpCMSDomainTestModule)
    )]
public class AbpCMSApplicationTestModule : AbpModule
{

}
