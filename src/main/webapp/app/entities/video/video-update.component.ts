import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    resources: this.fb.array([]),
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
      resources: this.createFormGroupArray(video.resources).getRawValue(),
      isSample: video.isSample
    });
    this.loadAllCourses();
    const videoCourseID = this.editForm.get('courseID').value;
    if (videoCourseID != null) {
      this.loadAllChaptersForCourse(videoCourseID);
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
    if (video.isSample == null) {
      video.isSample = false;
    }
    if (video.id !== undefined) {
      this.subscribeToSaveResponse(this.videoService.update(video));
    } else {
      this.subscribeToSaveResponse(this.videoService.create(video));
    }
  }

  private createFromForm(): IVideo {
    return {
      ...new Video(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      episode: this.editForm.get(['episode']).value,
      description: this.editForm.get(['description']).value,
      url: this.editForm.get(['url']).value,
      courseID: this.editForm.get(['courseID']).value,
      chapterID: this.editForm.get(['chapterID']).value,
      resources: this.editForm.get(['resources']).value,
      isSample: this.editForm.get(['isSample']).value
    };
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

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  get resources() {
    return this.editForm.get('resources') as FormArray;
  }

  addResources(name: string, url: string) {
    this.resources.push(this.createItem(name, url));
  }

  removeResources(resourceIndex: number) {
    this.resources.removeAt(resourceIndex);
  }

  private createItem(name: string, url: string): FormGroup {
    return this.fb.group({ name, url });
  }

  private createFormGroupArray(resources: { name: string; url: string }[]): FormArray {
    if (resources != null) {
      for (const resource of resources) {
        this.addResources(resource.name, resource.url);
      }
    }
    return this.resources;
  }
}
