﻿using AutoMapper;
using Interview.AbpCMS.PageManagement;

namespace Interview.AbpCMS;

public class AbpCMSApplicationAutoMapperProfile : Profile
{
    public AbpCMSApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<PageContent, PageContentDto>();
    }
}
