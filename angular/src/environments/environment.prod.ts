import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'AbpCMS',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44344',
    redirectUri: baseUrl,
    clientId: 'AbpCMS_App',
    responseType: 'code',
    scope: 'offline_access AbpCMS',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44344',
      rootNamespace: 'Interview.AbpCMS',
    },
  },
} as Environment;
