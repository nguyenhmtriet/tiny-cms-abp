using System.Threading.Tasks;

namespace Interview.AbpCMS.Data;

public interface IAbpCMSDbSchemaMigrator
{
    Task MigrateAsync();
}
