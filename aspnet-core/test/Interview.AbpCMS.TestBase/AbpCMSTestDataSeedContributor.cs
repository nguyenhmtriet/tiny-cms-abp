using Interview.AbpCMS.PageManagement;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace Interview.AbpCMS;

public class AbpCMSTestDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IPageManagementRepository _pageManagementRepository;

    public AbpCMSTestDataSeedContributor(IPageManagementRepository pageManagementRepository)
    {
        _pageManagementRepository = pageManagementRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        /* Seed additional test data... */
        await _pageManagementRepository.InsertManyAsync(new List<PageContent>
        {
            new PageContent(Guid.Parse("01000000-0000-0000-0000-000000000000"), "Angular", "<p>Content 1</p>", "Tester A", DateTime.Now, 1),
            new PageContent(Guid.Parse("02000000-0000-0000-0000-000000000000"), "SQL Server", "<p>Content 2</p>", "Tester B", DateTime.Now, 2),
            new PageContent(Guid.Parse("03000000-0000-0000-0000-000000000000"), "Azure", "<p>Content 3</p>", "Tester C", DateTime.Now, 3),
            new PageContent(Guid.Parse("04000000-0000-0000-0000-000000000000"), ".NET", "<p>Content 4</p>", "Tester D", DateTime.Now, 4),
            new PageContent(Guid.Parse("05000000-0000-0000-0000-000000000000"), "ASPNET Core WebAPI", "<p>Content 5</p>", "Tester E", DateTime.Now, 5),
            new PageContent(Guid.Parse("06000000-0000-0000-0000-000000000000"), "Blazor", "<p>Content 6</p>", "Tester F", DateTime.Now, 6),
            new PageContent(Guid.Parse("07000000-0000-0000-0000-000000000000"), "Abp Framework", "<p>Content 7</p>", "Tester G", DateTime.Now, 7),
            new PageContent(Guid.Parse("08000000-0000-0000-0000-000000000000"), "Multi tenant", "<p>Content 8</p>", "Tester H", DateTime.Now, 8),
            new PageContent(Guid.Parse("09000000-0000-0000-0000-000000000000"), "Identity Server", "<p>Content 9</p>", "Tester I", DateTime.Now, 9),
            new PageContent(Guid.Parse("10000000-0000-0000-0000-000000000000"), "Entity Framework Core", "<p>Content 10</p>", "Tester J", DateTime.Now, 10),
        });
    }
}
