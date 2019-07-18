import { NgModule } from '@angular/core';

import { OpenLearnrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [OpenLearnrSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [OpenLearnrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OpenLearnrSharedCommonModule {}
