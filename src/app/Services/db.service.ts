import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseStorage } from '@firebase/storage-types';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: FirebaseFirestore;
  storage: FirebaseStorage;
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDnMkw8wHSbIAZfWVkmNVVtwaCKml_nZJg',
      authDomain: 'bresser.firebaseapp.com',
      databaseURL: 'https://bresser.firebaseio.com',
      projectId: 'bresser',
      storageBucket: 'bresser.appspot.com',
      messagingSenderId: '169208186125',
      appId: '1:169208186125:web:735e891daaf467de235c44',
      measurementId: 'G-X14ZSY8CN2'
    };
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }
}
