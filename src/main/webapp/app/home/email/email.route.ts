import { Route } from '@angular/router';
import { EmailComponent } from 'app/home/email/email.component';

export const EMAIL_ROUTE: Route = {
    path: 'subscribe/email',
    component: EmailComponent,
    data: {
        authorities: [],
        pageTitle: 'ContactForm'
    }
};
