import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineTutorSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { EmailComponent } from './email/email.component';

@NgModule({
    imports: [OnlineTutorSharedModule, RouterModule.forChild([HOME_ROUTE]), MatSnackBarModule, MatButtonModule, MatInputModule],
    declarations: [HomeComponent, EmailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorHomeModule {}
