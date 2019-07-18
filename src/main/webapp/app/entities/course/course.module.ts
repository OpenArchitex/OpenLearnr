import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatChipsModule,
  MatExpansionModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { OpenLearnrSharedModule } from 'app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  CourseComponent,
  CourseDetailComponent,
  CourseUpdateComponent,
  CourseDeletePopupComponent,
  CourseDeleteDialogComponent,
  courseRoute,
  coursePopupRoute
} from './';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
  imports: [
    OpenLearnrSharedModule,
    RouterModule.forChild(ENTITY_STATES),
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    FlexLayoutModule
  ],
  declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
  entryComponents: [CourseComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenLearnrCourseModule {}
