import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxUiLoaderModule } from "ngx-ui-loader";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireStorageModule,
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
