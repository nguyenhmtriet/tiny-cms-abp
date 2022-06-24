using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Interview.AbpCMS.PageManagement;

public class PageContentDto : FullAuditedEntityDto<Guid?>
{
    public string Title { get; set; }

    public string Content { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime PublishDate { get; set; }

    public string Author { get; set; }
}
