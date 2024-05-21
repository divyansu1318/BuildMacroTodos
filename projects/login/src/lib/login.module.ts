import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUiLoaderModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
