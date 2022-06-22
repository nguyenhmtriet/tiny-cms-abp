using System;
using Volo.Abp.Application.Dtos;

namespace Interview.AbpCMS.PageManagement;

public class PageContentDto
{
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime PublishDate { get; set; }
    public string Author { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletionTime { get; set; }
    public DateTime CreationTime => DateTime.UtcNow;
    public DateTime? LastModificationTime { get; set; }
}
