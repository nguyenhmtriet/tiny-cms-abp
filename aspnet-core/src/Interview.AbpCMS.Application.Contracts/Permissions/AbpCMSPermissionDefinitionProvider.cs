using Interview.AbpCMS.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Interview.AbpCMS.Permissions;

public class AbpCMSPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var cmsManagementGroup = context.AddGroup(AbpCMSPermissions.GroupName, LocalizableString.Create<AbpCMSResource>("Permission:CmsManagement"));

        var pagePermission = cmsManagementGroup.AddPermission(AbpCMSPermissions.Page.Default, LocalizableString.Create<AbpCMSResource>("Permission:Cms.PageManagement"));
        pagePermission.AddChild(AbpCMSPermissions.Page.Create, LocalizableString.Create<AbpCMSResource>("Permission:Cms.Page.Create"));
        pagePermission.AddChild(AbpCMSPermissions.Page.Edit, LocalizableString.Create<AbpCMSResource>("Permission:Cms.Page.Edit"));
        pagePermission.AddChild(AbpCMSPermissions.Page.Delete, LocalizableString.Create<AbpCMSResource>("Permission:Cms.Page.Delete"));
    }
}
