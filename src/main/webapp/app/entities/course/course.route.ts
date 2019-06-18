import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { CourseDeletePopupComponent } from './course-delete-dialog.component';
import { ICourse } from 'app/shared/model/course.model';

@Injectable({ providedIn: 'root' })
export class CourseResolve implements Resolve<ICourse> {
  constructor(private service: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourse> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Course>) => response.ok),
        map((course: HttpResponse<Course>) => course.body)
      );
    }
    return of(new Course());
  }
}

export const courseRoute: Routes = [
  {
    path: '',
    component: CourseComponent,
    data: {
      authorities: [],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CourseDetailComponent,
    resolve: {
      course: CourseResolve
    },
    data: {
      authorities: [],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CourseUpdateComponent,
    resolve: {
      course: CourseResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CourseUpdateComponent,
    resolve: {
      course: CourseResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const coursePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CourseDeletePopupComponent,
    resolve: {
      course: CourseResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
