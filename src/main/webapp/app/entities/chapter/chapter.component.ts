import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChapter } from 'app/shared/model/chapter.model';
import { AccountService } from 'app/core';
import { ChapterService } from './chapter.service';

@Component({
  selector: 'jhi-chapter',
  templateUrl: './chapter.component.html'
})
export class ChapterComponent implements OnInit, OnDestroy {
  chapters: IChapter[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected chapterService: ChapterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.chapterService
      .query()
      .pipe(
        filter((res: HttpResponse<IChapter[]>) => res.ok),
        map((res: HttpResponse<IChapter[]>) => res.body)
      )
      .subscribe(
        (res: IChapter[]) => {
          this.chapters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInChapters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChapter) {
    return item.id;
  }

  registerChangeInChapters() {
    this.eventSubscriber = this.eventManager.subscribe('chapterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
