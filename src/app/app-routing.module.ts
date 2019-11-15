import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* PAGES */
import { ConfirmationAcountComponent } from './pages/confirmation-acount/confirmation-acount.component';
import { ConfirmationResetPasswordComponent } from './pages/confirmation-reset-password/confirmation-reset-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TwoStepVerificationComponent } from './pages/two-step-verification/two-step-verification.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'confirmpassword/:token', component: ConfirmationResetPasswordComponent },
  { path: 'confirmacount/:token', component: ConfirmationAcountComponent },
  { path: 'sms-verification', component: TwoStepVerificationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
