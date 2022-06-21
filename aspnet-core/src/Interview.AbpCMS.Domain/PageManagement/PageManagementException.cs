using System.Runtime.Serialization;
using Volo.Abp;

namespace Interview.AbpCMS.PageManagement;

public class PageManagementException : BusinessException
{
    public string Title { get; set; }

    public PageManagementException(SerializationInfo serializationInfo, StreamingContext context) 
        : base(serializationInfo, context) 
    { }

    public PageManagementException(string title, string errorCode)
    {
        Title = title;
        Code = errorCode;

        WithData(nameof(Title), title);
    }
}
