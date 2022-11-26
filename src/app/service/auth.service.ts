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
import { concatMap, from, lastValueFrom, Observable, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loading: boolean = false;
  user: any = [];
  loggedInUser$ = authState(this._auth);

  constructor(
    private _auth: Auth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  loginUser(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  /**
   *
   * @param email for the email address
   * @param password for the password
   * @returns that will be return
   */
  signUp(email: string, password: string): Promise<any> {
    return lastValueFrom(
      from(createUserWithEmailAndPassword(this._auth, email, password))
    );
  }

  loggedToPage() {
    this.loggedInUser$.subscribe((res) => {
      this.router.navigate([`/home/${res.uid}/summary`]);
    });
  }

  updateProfileData(profileData: Partial<User>): Observable<any> {
    const user = this._auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }

  /**
   *
   * @returns delete user
   *
   */
  /* deleteAcc() {
    const user = this._auth.currentUser;
    return user.delete();
  } */

  /**
   *
   * @returns logout the user
   */
  logout() {
    return from(this._auth.signOut());
  }
}
