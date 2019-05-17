import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentUpdateComponent } from './student-update.component';
import { StudentDeletePopupComponent } from './student-delete-dialog.component';
import { IStudent } from 'app/shared/model/student.model';

@Injectable({ providedIn: 'root' })
export class StudentResolve implements Resolve<IStudent> {
    constructor(private service: StudentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((student: HttpResponse<Student>) => student.body);
        }
        return Observable.of(new Student());
    }
}

export const studentRoute: Routes = [
    {
        path: 'student',
        component: StudentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/:id/view',
        component: StudentDetailComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/new',
        component: StudentUpdateComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/:id/edit',
        component: StudentUpdateComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student/:id/delete',
        component: StudentDeletePopupComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
