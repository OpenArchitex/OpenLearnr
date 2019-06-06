import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineTutorSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [OnlineTutorSharedModule, RouterModule.forChild([HOME_ROUTE]), MatSnackBarModule, MatButtonModule, MatInputModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorHomeModule {}
