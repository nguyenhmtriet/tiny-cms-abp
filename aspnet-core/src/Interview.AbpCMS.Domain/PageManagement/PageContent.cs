using System;
using Volo.Abp.Auditing;
using Volo.Abp.Domain.Entities;

namespace Interview.AbpCMS.PageManagement;

public class PageContent : Entity<Guid>, IHasDeletionTime, IHasCreationTime, IHasModificationTime
{
    //public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime PublishDate { get; set; }
    public string Author { get; set; }
    public int Order { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletionTime { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime? LastModificationTime { get; set; }

    public PageContent(Guid id, string title, string content, string author, DateTime publishDate, int order)
    {
        Id = id;
        Title = title;
        Content = content;
        PublishDate = publishDate;
        Author = author;
        Order = order;
        IsDeleted = false;
        DeletionTime = null;
        LastModificationTime = null;
        CreationTime = DateTime.Now;
    }

    public PageContent(string title, string content, string author, DateTime publishDate, int order)
    {
        Id = Guid.NewGuid();
        Title = title;
        Content = content;
        PublishDate = publishDate;
        Author = author;
        Order = order;
        IsDeleted = false;
        DeletionTime = null;
        LastModificationTime = null;
        CreationTime = DateTime.Now;
    }

    public override object[] GetKeys()
    {
        return new object[] { Id };
    }
}
