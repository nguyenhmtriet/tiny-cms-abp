import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPageGroupComponent } from './cms-page-group.component';

describe('CmsPageGroupComponent', () => {
  let component: CmsPageGroupComponent;
  let fixture: ComponentFixture<CmsPageGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsPageGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
