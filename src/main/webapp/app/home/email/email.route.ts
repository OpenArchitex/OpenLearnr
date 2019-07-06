import { Routes } from '@angular/router';
import { EmailComponent } from 'app/home/email/email.component';
import { UserRouteAccessService } from 'app/core';

export const EMAIL_ROUTE: Routes = [
  {
    path: 'subscribe/email',
    component: EmailComponent,
    data: {
      authorities: [],
      pageTitle: 'ContactForm'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'register/email',
    component: EmailComponent,
    data: {
      authorities: [],
      pageTitle: 'ContactForm'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'course/:id/view/email',
    component: EmailComponent,
    data: {
      authorities: [],
      pageTitle: 'Contact'
    },
    canActivate: [UserRouteAccessService]
  }
];
