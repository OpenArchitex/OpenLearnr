import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVideo, Video } from 'app/shared/model/video.model';
import { VideoService } from './video.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { JhiAlertService } from 'ng-jhipster';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter';

@Component({
  selector: 'jhi-video-update',
  templateUrl: './video-update.component.html'
})
export class VideoUpdateComponent implements OnInit {
  private _video: IVideo;

  courses: ICourse[];
  chapters: IChapter[];
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    episode: [null, [Validators.required]],
    description: [null, [Validators.required]],
    url: [null, [Validators.required]],
    courseID: [null, [Validators.required]],
    chapterID: [null, [Validators.required]],
    isSample: [null, [Validators.required]]
  });

  constructor(
    protected videoService: VideoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService,
    private chapterService: ChapterService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ video }) => {
      this.updateForm(video);
    });
  }

  updateForm(video: IVideo) {
    this.editForm.patchValue({
      id: video.id,
      name: video.name,
      episode: video.episode,
      description: video.description,
      url: video.url,
      courseID: video.courseID,
      chapterID: video.chapterID,
      isSample: video.isSample
    });
    this.loadAllCourses();
    if (this.video.courseID != null) {
      this.loadAllChaptersForCourse(this.video.courseID);
    }
  }

  loadAllCourses() {
    this.courseService.query().subscribe(
      (res: HttpResponse<ICourse[]>) => {
        this.courses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadAllChaptersForCourse(courseID: string) {
    this.chapterService.getChaptersForCourse(courseID).subscribe(
      (res: HttpResponse<IChapter[]>) => {
        this.chapters = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const video = this.createFromForm();
    if (this.video.isSample == null) {
      this.video.isSample = false;
    }
    if (video.id !== undefined) {
      this.subscribeToSaveResponse(this.videoService.update(video));
    } else {
      this.subscribeToSaveResponse(this.videoService.create(video));
    }
  }

  private createFromForm(): IVideo {
    const entity = {
      ...new Video(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      episode: this.editForm.get(['episode']).value,
      description: this.editForm.get(['description']).value,
      url: this.editForm.get(['url']).value,
      courseID: this.editForm.get(['courseID']).value,
      chapterID: this.editForm.get(['chapterID']).value,
      isSample: this.editForm.get(['isSample']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVideo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
  get video() {
    return this._video;
  }

  set video(video: IVideo) {
    this._video = video;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
