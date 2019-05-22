import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/shared/model/course.model';
import { IVideo } from 'app/shared/model/video.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { VideoService } from 'app/entities/video';
import { JhiAlertService } from 'ng-jhipster';
import {DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['course.scss']
})
export class CourseDetailComponent implements OnInit {
    course: ICourse;
    videos: IVideo[];
    clickedVideo: IVideo;

    constructor(
        private activatedRoute: ActivatedRoute,
        private videoService: VideoService,
        private jhiAlertService: JhiAlertService,
        private _sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.loadAllVideos();
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    loadAllVideos() {
        this.videoService.query().subscribe(
            (res: HttpResponse<IVideo[]>) => {
                this.videos = res.body;
                this.clickedVideo = this.videos[0];
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    getSafeURL(videoURL: string) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
    }
}
