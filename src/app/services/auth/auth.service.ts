import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  UserCredential,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { DbService } from '../db/db.service';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fbAuth = inject(Auth);
  dbService = inject(DbService);

  currentUserSig = signal<User | null>(null);
  usersSig = signal<User[]>([]);

  constructor() {
    this.fbAuth.onAuthStateChanged((user) => {
      if (user?.uid) {
        this.dbService.getUser(user!.uid).then((user) => {
          this.currentUserSig.set(user);
        });
      } else {
        this.currentUserSig.set(null);
      }
    });
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(this.fbAuth.setPersistence(browserSessionPersistence)).pipe(
      switchMap(() =>
        from(createUserWithEmailAndPassword(this.fbAuth, email, password))
      )
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(this.fbAuth.setPersistence(browserSessionPersistence)).pipe(
      switchMap(() =>
        from(signInWithEmailAndPassword(this.fbAuth, email, password))
      )
    );
  }

  signOut() {
    return from(signOut(this.fbAuth));
  }

  async getToken() {
    const currentUser = this.fbAuth.currentUser;
    if (currentUser) {
      return from(await currentUser.getIdToken());
    } else {
      return throwError('User not authenticated');
    }
  }
}
