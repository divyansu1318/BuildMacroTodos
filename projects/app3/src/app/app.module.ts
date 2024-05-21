import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { SignupComponent } from './signup/signup.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    NgxUiLoaderModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp( environment.firebaseConfig )),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
