import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { REPLRoute } from 'app/entities/replpad/replpad.route';
import { REPLComponent } from 'app/entities/replpad/replpad.component';
import { OpenLearnrSharedModule } from 'app/shared';

const ENTITY_STATES = [REPLRoute];

@NgModule({
  imports: [OpenLearnrSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [REPLComponent],
  entryComponents: [REPLComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenLearnrReplpadModule {}
