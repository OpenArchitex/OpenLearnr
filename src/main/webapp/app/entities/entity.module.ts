import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OnlineTutorCourseModule } from './course/course.module';
import { OnlineTutorVideoModule } from './video/video.module';
import { OnlineTutorStudentModule } from './student/student.module';
import { OnlineTutorChapterModule } from './chapter/chapter.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        OnlineTutorCourseModule,
        OnlineTutorVideoModule,
        OnlineTutorStudentModule,
        OnlineTutorChapterModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorEntityModule {}
