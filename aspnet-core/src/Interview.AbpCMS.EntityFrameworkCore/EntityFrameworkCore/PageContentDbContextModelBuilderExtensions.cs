using Interview.AbpCMS.PageManagement;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Interview.AbpCMS.EntityFrameworkCore;

public static class PageContentDbContextModelBuilderExtensions
{
    public static void ConfigurePageContentEntity(this ModelBuilder builder)
    {
        builder.Entity<PageContent>(b =>
        {
            b.ToTable(nameof(PageContent));

            b.ConfigureByConvention();

            b.Property(x => x.Content).HasMaxLength(PageContentEntityConsts.TitleMaxLength).IsRequired();
            b.Property(x => x.Content).HasMaxLength(PageContentEntityConsts.ContentMaxLength).IsRequired();
            b.Property(x => x.Author).HasMaxLength(PageContentEntityConsts.AuthorMaxLength).IsRequired();

            b.HasIndex(x => new { x.Title }).IsUnique(true);
            b.HasIndex(x => new { x.Title, x.Author }).IsUnique(true);

            b.ApplyObjectExtensionMappings();
        });

        builder.TryConfigureObjectExtensions<AbpCMSDbContext>();
    }
}
