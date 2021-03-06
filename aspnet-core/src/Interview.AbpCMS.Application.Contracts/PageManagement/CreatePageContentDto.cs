using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Interview.AbpCMS.PageManagement;

public class CreatePageContentDto
{
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

    [Required]
    public int Order { get; set; }
}
