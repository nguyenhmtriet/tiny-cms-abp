import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPageDetailComponent } from './cms-page-detail.component';

describe('CmsPageDetailComponent', () => {
  let component: CmsPageDetailComponent;
  let fixture: ComponentFixture<CmsPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsPageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
