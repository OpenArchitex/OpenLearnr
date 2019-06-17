import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICourse } from 'app/shared/model/course.model';
import { AccountService } from 'app/core';
import { CourseService } from './course.service';

@Component({
  selector: 'jhi-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit, OnDestroy {
  courses: ICourse[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected courseService: CourseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.courseService
      .query()
      .pipe(
        filter((res: HttpResponse<ICourse[]>) => res.ok),
        map((res: HttpResponse<ICourse[]>) => res.body)
      )
      .subscribe(
        (res: ICourse[]) => {
          this.courses = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCourses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICourse) {
    return item.id;
  }

  registerChangeInCourses() {
    this.eventSubscriber = this.eventManager.subscribe('courseListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
