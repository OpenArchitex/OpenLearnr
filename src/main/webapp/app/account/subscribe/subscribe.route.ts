import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SubscribeComponent } from './subscribe.component';

export const subscribeRoute: Routes = [
    {
        path: 'subscribe',
        component: SubscribeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subscribe'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course/:id/view/subscribe',
        component: SubscribeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subscribe'
        },
        canActivate: [UserRouteAccessService]
    },
];
