import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* DEPENDENCIAS */
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* FIREBASE */
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
/* Bootstrap */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Pages */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationAcountComponent } from './pages/confirmation-acount/confirmation-acount.component';
import { ConfirmationResetPasswordComponent } from './pages/confirmation-reset-password/confirmation-reset-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TwoStepVerificationComponent } from './pages/two-step-verification/two-step-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationAcountComponent,
    ConfirmationResetPasswordComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,  
    WelcomeComponent, TwoStepVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,    
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
