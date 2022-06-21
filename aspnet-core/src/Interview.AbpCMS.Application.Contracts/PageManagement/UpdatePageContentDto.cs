using System;
using System.ComponentModel.DataAnnotations;

namespace Interview.AbpCMS.PageManagement;

public class UpdatePageContentDto
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(PageContentEntityConsts.TitleMaxLength)]
    public string Title { get; set; }

    [Required]
    [StringLength(PageContentEntityConsts.ContentMaxLength)]
    public string Content { get; set; }

    [Required]
    [StringLength(PageContentEntityConsts.AuthorMaxLength)]
    public string Author { get; set; }

    public DateTime PublishDate { get; set; }

    public bool IsDeleted { get; set; }
}
