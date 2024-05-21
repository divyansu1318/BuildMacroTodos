import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

    registrationForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
    });
    hide: boolean = true;

    constructor(private authService: AuthService, private ngxService: NgxUiLoaderService, private router: Router) {}

    ngOnInit(): void {
        
    }

    registerUser() {
        const { email, password, confirmPassword } = this.registrationForm.getRawValue();
        if (password !== confirmPassword) {
            alert('Please enter same password!');
            return;
        }
        if (email && password) {
            this.ngxService.start();
            this.authService.signUp(email, password).then((result) => {
                this.ngxService.stop();
                window.alert('You have been successfully registered!');
                this.router.navigate(['login']);
            })
            .catch((error) => {
                this.ngxService.stop();
                window.alert(error.message);
            });
        }
    }
}
