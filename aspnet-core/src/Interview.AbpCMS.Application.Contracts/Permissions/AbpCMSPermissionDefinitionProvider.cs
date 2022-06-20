using Interview.AbpCMS.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Interview.AbpCMS.Permissions;

public class AbpCMSPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(AbpCMSPermissions.GroupName, LocalizableString.Create<AbpCMSResource>("Permission:CmsManagement"));
        myGroup.AddPermission(AbpCMSPermissions.Page.Create, LocalizableString.Create<AbpCMSResource>("Permission:Create"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AbpCMSResource>(name);
    }
}
