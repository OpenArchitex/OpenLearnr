import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnlineTutorSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { SafePipe } from 'app/shared/util/SafePipe';

@NgModule({
  imports: [OnlineTutorSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
  entryComponents: [JhiLoginModalComponent],
  exports: [OnlineTutorSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorSharedModule {
  static forRoot() {
    return {
      ngModule: OnlineTutorSharedModule
    };
  }
}
