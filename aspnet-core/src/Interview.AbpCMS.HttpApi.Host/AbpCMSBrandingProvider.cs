using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Interview.AbpCMS;

[Dependency(ReplaceServices = true)]
public class AbpCMSBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "AbpCMS";
}
