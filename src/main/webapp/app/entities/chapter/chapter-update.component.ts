import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IChapter, Chapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';

@Component({
  selector: 'jhi-chapter-update',
  templateUrl: './chapter-update.component.html'
})
export class ChapterUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    chapterNumber: [null, [Validators.required]],
    description: [null, [Validators.required]],
    courseID: [null, [Validators.required]]
  });

  constructor(protected chapterService: ChapterService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chapter }) => {
      this.updateForm(chapter);
    });
  }

  updateForm(chapter: IChapter) {
    this.editForm.patchValue({
      id: chapter.id,
      name: chapter.name,
      chapterNumber: chapter.chapterNumber,
      description: chapter.description,
      courseID: chapter.courseID
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chapter = this.createFromForm();
    if (chapter.id !== undefined) {
      this.subscribeToSaveResponse(this.chapterService.update(chapter));
    } else {
      this.subscribeToSaveResponse(this.chapterService.create(chapter));
    }
  }

  private createFromForm(): IChapter {
    const entity = {
      ...new Chapter(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      chapterNumber: this.editForm.get(['chapterNumber']).value,
      description: this.editForm.get(['description']).value,
      courseID: this.editForm.get(['courseID']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChapter>>) {
    result.subscribe((res: HttpResponse<IChapter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
