import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  authState,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { concatMap, from, Observable, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login: boolean = false;
  loading: boolean = false;
  user: any = [];
  loggedInUser$ = authState(this._auth);
  constructor(public _auth: Auth, public firestore: AngularFirestore) {}

  loginUser(email: any, password: any): Observable<any> {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }
}
