using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interview.AbpCMS.PageManagement
{
    internal class PageManagementClassData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[] { new CreateOrUpdatePageContentDto
            {
                Title = "xUnitTest",
                Author = "Author A",
                Content = "<p>Content A</p>",
                PublishDate = DateTime.Now,
                Order = 1,
            }};
            yield return new object[] { new CreateOrUpdatePageContentDto
            {
                Id = Guid.Parse("01000000-0000-0000-0000-000000000000"), // must be existed in AbpCMSTestDataSeedContributor
                Title = "Abp Framework Test Service",
                Author = "Author B",
                Content = "<p>Content B</p>",
                PublishDate = DateTime.Now,
                Order = 10,
            }};
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
