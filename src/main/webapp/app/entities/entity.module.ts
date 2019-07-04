import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: './course/course.module#OnlineTutorCourseModule'
      },
      {
        path: 'video',
        loadChildren: './video/video.module#OnlineTutorVideoModule'
      },
      {
        path: 'chapter',
        loadChildren: './chapter/chapter.module#OnlineTutorChapterModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#OnlineTutorCommentModule'
      },
      {
        path: 'replPad',
        loadChildren: './replpad/replpad.module#OnlineTutorReplpadModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorEntityModule {}
