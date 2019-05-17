import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { Principal } from 'app/core';
import { VideoService } from './video.service';

@Component({
    selector: 'jhi-video',
    templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, OnDestroy {
    videos: IVideo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private videoService: VideoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.videoService.query().subscribe(
            (res: HttpResponse<IVideo[]>) => {
                this.videos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVideos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVideo) {
        return item.id;
    }

    registerChangeInVideos() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
