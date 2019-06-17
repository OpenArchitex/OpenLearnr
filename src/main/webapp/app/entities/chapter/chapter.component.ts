import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChapter } from 'app/shared/model/chapter.model';
import { Principal } from 'app/core';
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
        private chapterService: ChapterService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.chapterService.query().subscribe(
            (res: HttpResponse<IChapter[]>) => {
                this.chapters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
