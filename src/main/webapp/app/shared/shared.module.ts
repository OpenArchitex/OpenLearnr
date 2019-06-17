import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnlineTutorSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [OnlineTutorSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [OnlineTutorSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorSharedModule {
  static forRoot() {
    return {
      ngModule: OnlineTutorSharedModule
    };
  }
}
