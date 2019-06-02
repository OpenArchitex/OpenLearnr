import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineTutorSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [OnlineTutorSharedModule, RouterModule.forChild([HOME_ROUTE]), MatSnackBarModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorHomeModule {}
