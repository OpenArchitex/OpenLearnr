import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter, IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-chapter-update',
  templateUrl: './chapter-update.component.html'
})
export class ChapterUpdateComponent implements OnInit {
  private _chapter: IChapter;
  private _courses: ICourse[];
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    chapterNumber: [null, [Validators.required]],
    description: [null, [Validators.required]],
    courseID: [null, [Validators.required]],
    isPaidChapter: [null, [Validators.required]]
  });

  constructor(
    protected chapterService: ChapterService,
    private courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chapter }) => {
      this.updateForm(chapter);
    });
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.query().subscribe(
      (res: HttpResponse<ICourse[]>) => {
        this.courses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(chapter: IChapter) {
    this.editForm.patchValue({
      id: chapter.id,
      name: chapter.name,
      chapterNumber: chapter.chapterNumber,
      description: chapter.description,
      courseID: chapter.courseID,
      isPaidChapter: chapter.isPaidChapter
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chapter = this.createFromForm();
    if (chapter.isPaidChapter == null) {
      chapter.isPaidChapter = false;
    }
    chapter.courseName = this._courses.find(arrayItem => {
      return arrayItem.id === chapter.courseID;
    }).name;
    if (chapter.id !== undefined) {
      this.subscribeToSaveResponse(this.chapterService.update(chapter));
    } else {
      this.subscribeToSaveResponse(this.chapterService.create(chapter));
    }
  }

  private createFromForm(): IChapter {
    return {
      ...new Chapter(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      chapterNumber: this.editForm.get(['chapterNumber']).value,
      description: this.editForm.get(['description']).value,
      courseID: this.editForm.get(['courseID']).value,
      isPaidChapter: this.editForm.get(['isPaidChapter']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChapter>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
  get chapter() {
    return this._chapter;
  }

  set chapter(chapter: IChapter) {
    this._chapter = chapter;
  }

  get courses(): ICourse[] {
    return this._courses;
  }

  set courses(value: ICourse[]) {
    this._courses = value;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
