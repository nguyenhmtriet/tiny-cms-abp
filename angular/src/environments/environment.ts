import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'AbpCMS',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:5000',
    redirectUri: baseUrl,
    clientId: 'AbpCMS_App',
    responseType: 'code',
    scope: 'offline_access AbpCMS',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:5000',
      rootNamespace: 'Interview.AbpCMS',
    },
  },
} as Environment;
