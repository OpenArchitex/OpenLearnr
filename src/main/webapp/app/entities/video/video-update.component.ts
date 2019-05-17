import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';

@Component({
    selector: 'jhi-video-update',
    templateUrl: './video-update.component.html'
})
export class VideoUpdateComponent implements OnInit {
    private _video: IVideo;
    isSaving: boolean;

    constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ video }) => {
            this.video = video;
        });
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
}
