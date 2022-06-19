import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDashboardComponent } from './cms-dashboard.component';

describe('CmsDashboardComponent', () => {
  let component: CmsDashboardComponent;
  let fixture: ComponentFixture<CmsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
