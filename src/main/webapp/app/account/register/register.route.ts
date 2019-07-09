import { Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { UserRouteAccessService } from 'app/core';

export const registerRoute: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      authorities: [],
      pageTitle: 'Registration'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'activate/register',
    component: RegisterComponent,
    data: {
      authorities: [],
      pageTitle: 'Registration'
    },
    canActivate: [UserRouteAccessService]
  }
];
