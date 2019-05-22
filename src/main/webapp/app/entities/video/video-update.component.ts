import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';
import {ICourse} from 'app/shared/model/course.model';
import {CourseService} from 'app/entities/course';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-video-update',
    templateUrl: './video-update.component.html'
})
export class VideoUpdateComponent implements OnInit {
    private _video: IVideo;
    private courses: ICourse[];
    isSaving: boolean;

    constructor(
        private videoService: VideoService,
        private activatedRoute: ActivatedRoute,
        private courseService: CourseService,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ video }) => {
            this.video = video;
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.video.id !== undefined) {
            this.subscribeToSaveResponse(this.videoService.update(this.video));
        } else {
            this.subscribeToSaveResponse(this.videoService.create(this.video));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVideo>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    private onSaveSuccess() {
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
