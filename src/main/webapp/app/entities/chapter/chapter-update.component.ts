import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';

@Component({
    selector: 'jhi-chapter-update',
    templateUrl: './chapter-update.component.html'
})
export class ChapterUpdateComponent implements OnInit {
    private _chapter: IChapter;
    isSaving: boolean;

    constructor(private chapterService: ChapterService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chapter }) => {
            this.chapter = chapter;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.chapter.id !== undefined) {
            this.subscribeToSaveResponse(this.chapterService.update(this.chapter));
        } else {
            this.subscribeToSaveResponse(this.chapterService.create(this.chapter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChapter>>) {
        result.subscribe((res: HttpResponse<IChapter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get chapter() {
        return this._chapter;
    }

    set chapter(chapter: IChapter) {
        this._chapter = chapter;
    }
}
