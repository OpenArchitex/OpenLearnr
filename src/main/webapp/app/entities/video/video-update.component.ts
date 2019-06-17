import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVideo, Video } from 'app/shared/model/video.model';
import { VideoService } from './video.service';

@Component({
  selector: 'jhi-video-update',
  templateUrl: './video-update.component.html'
})
export class VideoUpdateComponent implements OnInit {
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

  constructor(protected videoService: VideoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

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
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const video = this.createFromForm();
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
    result.subscribe((res: HttpResponse<IVideo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
