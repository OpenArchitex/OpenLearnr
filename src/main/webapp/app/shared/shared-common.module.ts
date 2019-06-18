import { NgModule } from '@angular/core';

import { OnlineTutorSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [OnlineTutorSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [OnlineTutorSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OnlineTutorSharedCommonModule {}
