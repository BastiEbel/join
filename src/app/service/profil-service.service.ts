import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, lastValueFrom, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilServiceService {
  ref: any;

  /**
   * get the currentUser for the Profil
   *
   */
  get currentUserProfile$(): Observable<User | null> {
    return this.authService.loggedInUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        this.ref = doc(this.firestore, 'users', user?.uid);
        return docData(this.ref) as Observable<User>;
      })
    );
  }

  constructor(public firestore: Firestore, public authService: AuthService) {}

  /**
   *
   * @param user current user from the Registration
   * @returns user data to the firestore database
   */
  addUser(user: User): Observable<any> {
    let ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  /**
   *
   * @param user user data from the user firestore database
   * @returns update user information to database
   */
  updateUser(user: User): Observable<any> {
    this.ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(this.ref, { ...user }));
  }

  /**
   *
   * @returns delete user to the database and delete this one
   *
   */
  deleteDBUser() {
    return from(deleteDoc(this.ref));
  }
}
