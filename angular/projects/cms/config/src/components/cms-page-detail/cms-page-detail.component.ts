import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Moment } from 'moment';
import { PageContentDto } from '../../models';
import { CmsManagementService } from '../../services/cms-management.service';

@Component({
  selector: 'lib-cms-page-detail',
  templateUrl: './cms-page-detail.component.html',
  styleUrls: ['./cms-page-detail.component.css'],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, width: '50vw' } },
  ],
})
export class CmsPageDetailComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: PageContentDto,
    cmsManagementService: CmsManagementService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: [this.data?.title, Validators.required],
      author: [this.data?.author, Validators.required],
      content: [this.data?.content, Validators.required],
      publishDate: [this.data?.publishDate, Validators.required],
      id: [this.data?.id],
      isDeleted: [this.data?.isDeleted || false],
    });
  }

  getFormValue() {
    if (this.form.invalid) {
      return;
    }

    const publishDate: Moment = this.form.value.publishDate;
    return { ...this.form.value, publishDate: publishDate?.format('yyyy-MM-DD') };
  }
}
