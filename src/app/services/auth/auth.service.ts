import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fbAuth = inject(Auth);

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.fbAuth, email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.fbAuth, email, password));
  }

  signOut() {
    return from(signOut(this.fbAuth));
  }

  async getToken() {
    const currentUser = this.fbAuth.currentUser;
    console.log(currentUser);
    if (currentUser) {
      return from(await currentUser.getIdToken());
    } else {
      return throwError('User not authenticated');
    }
  }
}
