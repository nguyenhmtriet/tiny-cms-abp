using Interview.AbpCMS.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Interview.AbpCMS.Permissions;

public class AbpCMSPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(AbpCMSPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(AbpCMSPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AbpCMSResource>(name);
    }
}
