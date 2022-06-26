using Interview.AbpCMS.PageManagement;
using Shouldly;
using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;
using Xunit;

namespace Interview.AbpCMS.PageManagement.Tests;

/* This is just an example test class.
 * Normally, you don't test code of the modules you are using
 * (like IIdentityUserAppService here).
 * Only test your own application services.
 */
public class PageManagementServiceTests : AbpCMSApplicationTestBase
{
    private readonly PageManagementService _pageManagementService;

    public PageManagementServiceTests()
    {
        _pageManagementService = GetRequiredService<PageManagementService>();
    }

    [Fact]
    public async Task Should_Get_All_Lists_Of_Page_Contents()
    {
        //Act
        var result = await _pageManagementService.GetAllLists(new System.Threading.CancellationTokenSource().Token);

        //Assert
        result.Items.Count.ShouldBeEquivalentTo(10);
    }

    [Fact]
    public async Task Should_Get_Page_Content_By_Id()
    {
        var id = Guid.Parse("10000000-0000-0000-0000-000000000000");
        //Act
        var result = await _pageManagementService.GetPageContentAsync(id, new System.Threading.CancellationTokenSource().Token);

        //Assert
        result.ShouldNotBeNull();
        result.Id.ShouldBeEquivalentTo(id);
    }

    [Theory]
    [InlineData(0, 5, "order ASC", 10)]
    [InlineData(5, 5, "title DESC", 10)]
    [InlineData(5, 5, "author DESC", 10)]
    [InlineData(10, 5, "author DESC", 10)]
    public async Task Should_Get_Page_Contents_By_Pagination(int skipCount, int maxResultCount, string sorting, int totalCount)
    {
        var query = new GetPageContentQuery
        {
            SkipCount = skipCount,
            MaxResultCount = maxResultCount,
            Sorting = sorting
        };

        //Act
        var result = await _pageManagementService.GetPageContentsAsync(query, new System.Threading.CancellationTokenSource().Token);

        //Assert
        result.ShouldNotBeNull();

        if (skipCount >= totalCount)
        {
            result.Items.Count.ShouldBe(0);
            return;
        }

        result.Items.Count.ShouldBe(maxResultCount);
        result.TotalCount.ShouldBe(totalCount);
    }

    [Theory]
    [ClassData(typeof(PageManagementClassData))]
    public async Task Should_Be_Able_To_Create_Or_Update(CreateOrUpdatePageContentDto model)
    {
        var result = await _pageManagementService.HandleInsertOrUpdatePageContentAsync(model, new System.Threading.CancellationTokenSource().Token);

        if (model.Id == null)
        {
            result.Id.ShouldNotBeSameAs(model.Id);
            result.CreationTime.ShouldBeLessThan(DateTime.Now);
        }
        else
        {
            result.Id.ShouldBe(model.Id);
            result.LastModificationTime.ShouldNotBeNull();
            result.LastModificationTime.Value.ShouldBeLessThan(DateTime.Now);
        }

        //Assert
        result.ShouldNotBeNull();
    }

    [Fact]
    public async Task Should_Be_Not_Updatable_With_Non_Existed_Id()
    {
        var nonExistedModel = new CreateOrUpdatePageContentDto
        {
            Id = Guid.Parse("12345678-0000-0000-0000-000000000000"), // Id must be not existed in AbpCMSTestDataSeedContributor
            Title = "Non Existed",
            Author = "Unknow",
            Content = "<p>Empty</p>",
            PublishDate = DateTime.Now,
            Order = 10,
        };

        var tokenSource = new System.Threading.CancellationTokenSource();

        await Should.ThrowAsync<EntityNotFoundException>(() =>
            _pageManagementService.HandleInsertOrUpdatePageContentAsync(nonExistedModel, tokenSource.Token));
    }
}
