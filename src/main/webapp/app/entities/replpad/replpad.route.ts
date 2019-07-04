import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { REPLComponent } from 'app/entities/replpad/replpad.component';

export const REPLRoute: Route = {
  path: '',
  component: REPLComponent,
  data: {
    authorities: [],
    pageTitle: 'Code REPL'
  },
  canActivate: [UserRouteAccessService]
};
