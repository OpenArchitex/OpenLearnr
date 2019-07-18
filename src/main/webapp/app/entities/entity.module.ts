import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: './course/course.module#OpenLearnrCourseModule'
      },
      {
        path: 'video',
        loadChildren: './video/video.module#OpenLearnrVideoModule'
      },
      {
        path: 'chapter',
        loadChildren: './chapter/chapter.module#OpenLearnrChapterModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#OpenLearnrCommentModule'
      },
      {
        path: 'replPad',
        loadChildren: './replpad/replpad.module#OpenLearnrReplpadModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenLearnrEntityModule {}
