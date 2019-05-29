import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChapter } from 'app/shared/model/chapter.model';

@Component({
    selector: 'jhi-chapter-detail',
    templateUrl: './chapter-detail.component.html'
})
export class ChapterDetailComponent implements OnInit {
    chapter: IChapter;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chapter }) => {
            this.chapter = chapter;
        });
    }

    previousState() {
        window.history.back();
    }
}
