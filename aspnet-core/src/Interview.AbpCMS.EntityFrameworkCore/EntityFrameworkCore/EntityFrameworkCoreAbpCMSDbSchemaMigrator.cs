using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Interview.AbpCMS.Data;
using Volo.Abp.DependencyInjection;

namespace Interview.AbpCMS.EntityFrameworkCore;

public class EntityFrameworkCoreAbpCMSDbSchemaMigrator
    : IAbpCMSDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreAbpCMSDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the AbpCMSDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<AbpCMSDbContext>()
            .Database
            .MigrateAsync();
    }
}
