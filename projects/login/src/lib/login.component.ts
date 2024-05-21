import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'lib-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    constructor(public afAuth: AngularFireAuth, private router: Router, private ngxService: NgxUiLoaderService) { }

    ngOnInit(): void {
    }

    signIn() {
        const { email, password } = this.loginForm.getRawValue();

        if (email && password) {
            this.ngxService.start();
            this.afAuth
                .signInWithEmailAndPassword(email, password)
                .then((result: any) => {
                    localStorage.setItem('userId', result?.user?._delegate?.uid)
                    this.ngxService.stop();
                    this.router.navigate(['dashboard'])
                })
                .catch((error) => {
                    this.ngxService.stop();
                    window.alert('Incorrect email or password');
                });
        }
    }
}
