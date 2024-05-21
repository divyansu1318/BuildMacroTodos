import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

    todos: Todo[] = [];
    originalTodos: any = [];
    userId: string | null = '';
    searchText: string = '';

    constructor(private db: AngularFirestore, private _bottomSheet: MatBottomSheet, private auth: AngularFireAuth, private ngxService: NgxUiLoaderService, private router: Router) {}

    ngOnInit(): void {
        if (localStorage.getItem('userId')) {
            this.userId = localStorage.getItem('userId');
            if (this.userId) {
                this.getTodos();
            }
        }
    }

    getTodos() {
        this.ngxService.start();
        this.db.collection('todos', ref => ref.where('userId', '==', this.userId)).valueChanges({ idField: 'id' }).subscribe((data: any) => {
            this.todos = data;
            this.originalTodos = data;
            this.ngxService.stop();
        });
    }

    openBottomSheet(): void {
        this._bottomSheet.open(AddTodoComponent);
    }

    updateTodo(todo: Todo) {
        this._bottomSheet.open(AddTodoComponent, {data: todo});
    }

    deleteTodo(todo: Todo) {
        this.db.collection('todos').doc(todo.id).delete();
    }

    getDate(date: any) {
        return date.toDate()
    }

    search() {
        this.todos = this.originalTodos.filter((data: Todo) => data.title.toLowerCase().includes(this.searchText.toLowerCase()) || data?.description?.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    logout() {
        this.auth.signOut().then(() => {
            localStorage.clear();
            this.router.navigate(['login']);
        });
    }
}
