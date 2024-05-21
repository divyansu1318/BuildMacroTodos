import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Todo } from '../interfaces/todo.interface';


@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {

    todoForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dueDate: new FormControl(new Date(), [Validators.required]),
        attachment: new FormControl('')
    });
    userId: string | null = '';
    isUpdate: boolean = false;
    imageUrl: string = '';

    constructor(private db: AngularFirestore, private bottomSheet: MatBottomSheet, private storage: AngularFireStorage, private ngxService: NgxUiLoaderService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Todo) { }

    ngOnInit(): void {
        if (this.data && this.data.id) {
            this.isUpdate = true;
            this.todoForm.patchValue({
                title: this.data.title,
                description: this.data.description,
                dueDate: new Date(this.data.dueDate.toDate()),
                attachment: this.data.attachment
            });
        }

        if (localStorage.getItem('userId')) {
            this.userId = localStorage.getItem('userId');
        }
    }

    add() {
        this.ngxService.start();
        if (!this.isUpdate) {
            const { title, description, dueDate, attachment } = this.todoForm.getRawValue();
            this.db.collection('todos').add({ title, description, dueDate: dueDate, attachment, userId: this.userId }).then((data: any) => {
                this.bottomSheet.dismiss();
                this.ngxService.stop();
            });
        } else {
            const { title, description, dueDate, attachment } = this.todoForm.getRawValue();
            this.db.collection('todos').doc(this.data.id).update({ title, description, dueDate: dueDate, attachment }).then((data: any) => {
                this.bottomSheet.dismiss();
                this.ngxService.stop();
            })
        }
    }

    onFileSelected(event: any) {
        this.ngxService.start();
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`Images/${n}`, file);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    let url = fileRef.getDownloadURL();
                    let imageUrl = '';
                    url.subscribe(url => {
                        if (url) {
                            imageUrl = url;
                        }
                        this.imageUrl = url;
                        this.todoForm.patchValue({
                            attachment: this.imageUrl
                        })
                        this.ngxService.stop();
                    });
                })
            )
            .subscribe(url => {
                if (url) {
                    console.log(url);
                    this.ngxService.stop();
                }
            });
    }

}
