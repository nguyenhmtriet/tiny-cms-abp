using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Interview.AbpCMS.PageManagement
{
    public class CreateOrUpdatePageContentDto : PageContentDto
    {        
        [Required]
        [MaxLength(PageContentEntityConsts.TitleMaxLength)]
        public new string Title { get; set; }

        [Required]
        [MaxLength(PageContentEntityConsts.ContentMaxLength)]
        public new string Content { get; set; }

        [Required]
        [MaxLength(PageContentEntityConsts.AuthorMaxLength)]
        public new string Author { get; set; }
    }
}
