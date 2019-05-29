import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineTutorSharedModule } from 'app/shared';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Module as StripeModule } from 'stripe-angular';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        OnlineTutorSharedModule,
        RouterModule.forChild(accountState),
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        MatSelectModule,
        StripeModule.forRoot()
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        SubscribeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorAccountModule {}
