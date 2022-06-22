import { ABP, AbstractNavTreeService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CmsSettingsService extends AbstractNavTreeService<ABP.Tab> {}