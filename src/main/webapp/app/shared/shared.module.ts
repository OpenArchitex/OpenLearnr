import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OpenLearnrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { SafePipe } from 'app/shared/util/SafePipe';

@NgModule({
  imports: [OpenLearnrSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
  entryComponents: [JhiLoginModalComponent],
  exports: [OpenLearnrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenLearnrSharedModule {
  static forRoot() {
    return {
      ngModule: OpenLearnrSharedModule
    };
  }
}
