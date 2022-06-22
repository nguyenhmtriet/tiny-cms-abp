import { ABP } from '@abp/ng.core';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CmsSettingsService } from 'cms/config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-cms-dashboard',
  templateUrl: './cms-dashboard.component.html',
  styleUrls: ['./cms-dashboard.component.css'],
})
export class CmsDashboardComponent implements OnInit {
  private subscription = new Subscription();
  settings: ABP.Tab[] = [];

  selected!: ABP.Tab;

  trackByFn: TrackByFunction<ABP.Tab> = (_, item) => item.name;

  constructor(private settingTabsService: CmsSettingsService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.settingTabsService.visible$.subscribe(settings => {
        this.settings = settings;

        if (!this.selected) this.selected = this.settings[0];
      })
    );
  }
}
