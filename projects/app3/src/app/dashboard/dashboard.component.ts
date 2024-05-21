import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

    todos: Todo[] = [];
    userId: string | null = '';

    constructor(private db: AngularFirestore, private auth: AngularFireAuth, private router: Router, private ngxService: NgxUiLoaderService) {}

    ngOnInit(): void {
        if (localStorage.getItem('userId')) {
            this.userId = localStorage.getItem('userId');
            this.getTodos();
        }
    }

    getTodos() {
        this.ngxService.start();
        this.db.collection('todos', ref => ref.where('userId', '==', this.userId)).valueChanges().subscribe((data: any) => {
            this.ngxService.stop();
            this.todos = data;
        });
    }

    getDate(date: any) {
        return date.toDate();
    }

    logout() {
        this.auth.signOut().then(() => {
            localStorage.clear();
            this.router.navigate(['login']);
        });
    }
}
