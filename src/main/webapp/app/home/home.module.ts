import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenLearnrSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { EmailComponent } from './email/email.component';
import { EMAIL_ROUTE } from 'app/home/email/email.route';
import { ReactiveFormsModule } from '@angular/forms';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    OpenLearnrSharedModule,
    RouterModule.forChild([HOME_ROUTE, ...EMAIL_ROUTE]),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8063185008208498'
    }),
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, EmailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenLearnrHomeModule {}
