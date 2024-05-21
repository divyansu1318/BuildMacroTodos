import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'app3';
  users!: Observable<any>;

  constructor(firestore: Firestore, db: AngularFirestore) {
    // this.users = db.collection('users').valueChanges();
    //     console.log('user', this.users);
        // this.users.subscribe((data) => {
        //     console.log(data);
        // });

        // db.collection('users').add({name: 'Chintan'});
  }
}
