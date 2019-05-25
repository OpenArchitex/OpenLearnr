import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SubscribeComponent } from './subscribe.component';

export const subscribeRoute: Route = {
    path: 'subscribe',
    component: SubscribeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Subscribe'
    },
    canActivate: [UserRouteAccessService]
};
