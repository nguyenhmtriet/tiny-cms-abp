namespace Interview.AbpCMS.Permissions;

public static class AbpCMSPermissions
{
    public const string GroupName = "AbpCMSManagement";

    public static class Page
    {
        public const string Default = GroupName + ".Pages";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
}

