import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Chapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ChapterComponent } from './chapter.component';
import { ChapterDetailComponent } from './chapter-detail.component';
import { ChapterUpdateComponent } from './chapter-update.component';
import { ChapterDeletePopupComponent } from './chapter-delete-dialog.component';
import { IChapter } from 'app/shared/model/chapter.model';

@Injectable({ providedIn: 'root' })
export class ChapterResolve implements Resolve<IChapter> {
    constructor(private service: ChapterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((chapter: HttpResponse<Chapter>) => chapter.body);
        }
        return Observable.of(new Chapter());
    }
}

export const chapterRoute: Routes = [
    {
        path: 'chapter',
        component: ChapterComponent,
        data: {
            authorities: [],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chapter/:id/view',
        component: ChapterDetailComponent,
        resolve: {
            chapter: ChapterResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chapter/new',
        component: ChapterUpdateComponent,
        resolve: {
            chapter: ChapterResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chapter/:id/edit',
        component: ChapterUpdateComponent,
        resolve: {
            chapter: ChapterResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chapterPopupRoute: Routes = [
    {
        path: 'chapter/:id/delete',
        component: ChapterDeletePopupComponent,
        resolve: {
            chapter: ChapterResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
