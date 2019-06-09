import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Video } from 'app/shared/model/video.model';
import { VideoService } from './video.service';
import { VideoComponent } from './video.component';
import { VideoDetailComponent } from './video-detail.component';
import { VideoUpdateComponent } from './video-update.component';
import { VideoDeletePopupComponent } from './video-delete-dialog.component';
import { IVideo } from 'app/shared/model/video.model';

@Injectable({ providedIn: 'root' })
export class VideoResolve implements Resolve<IVideo> {
    constructor(private service: VideoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((video: HttpResponse<Video>) => video.body);
        }
        return Observable.of(new Video());
    }
}

export const videoRoute: Routes = [
    {
        path: 'video',
        component: VideoComponent,
        data: {
            authorities: [],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video/:id/view',
        component: VideoDetailComponent,
        resolve: {
            video: VideoResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video/new',
        component: VideoUpdateComponent,
        resolve: {
            video: VideoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video/:id/edit',
        component: VideoUpdateComponent,
        resolve: {
            video: VideoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const videoPopupRoute: Routes = [
    {
        path: 'video/:id/delete',
        component: VideoDeletePopupComponent,
        resolve: {
            video: VideoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
