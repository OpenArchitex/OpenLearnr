import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-course-update',
    templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
    private _course: ICourse;
    isSaving: boolean;

    constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
        this.broadcastChange();
    }

    private broadcastChange() {
        this.eventManager.broadcast({
            name: 'courseListModification',
            content: 'Created a course'
        });
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get course() {
        return this._course;
    }

    set course(course: ICourse) {
        this._course = course;
    }
}
