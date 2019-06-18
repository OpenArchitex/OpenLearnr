import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { AccountService } from 'app/core';
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
    protected videoService: VideoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.videoService
      .query()
      .pipe(
        filter((res: HttpResponse<IVideo[]>) => res.ok),
        map((res: HttpResponse<IVideo[]>) => res.body)
      )
      .subscribe(
        (res: IVideo[]) => {
          this.videos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
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
    this.eventSubscriber = this.eventManager.subscribe('videoListModification', () => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
