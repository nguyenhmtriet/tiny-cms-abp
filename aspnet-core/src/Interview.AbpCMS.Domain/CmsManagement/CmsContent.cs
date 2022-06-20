using System;

namespace Interview.AbpCMS.CmsManagement
{
    public  class CmsContent
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public DateTime PublishDate { get; set; }
        public string Author { get; set; }
    }
}
