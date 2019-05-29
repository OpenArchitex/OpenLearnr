import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-chapter-update',
    templateUrl: './chapter-update.component.html'
})
export class ChapterUpdateComponent implements OnInit {
    private _chapter: IChapter;
    private _courses: ICourse[];
    isSaving: boolean;

    constructor(
        private chapterService: ChapterService,
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chapter }) => {
            this.chapter = chapter;
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
        if (this.chapter.id !== undefined) {
            this.subscribeToSaveResponse(this.chapterService.update(this.chapter));
        } else {
            this.subscribeToSaveResponse(this.chapterService.create(this.chapter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChapter>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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

    get courses(): ICourse[] {
        return this._courses;
    }

    set courses(value: ICourse[]) {
        this._courses = value;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
