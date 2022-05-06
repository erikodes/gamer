import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState = new BehaviorSubject(false);
    user: string = this.getUserFromLocalStorage();
    userData: any;

    constructor(
        public database: AngularFireDatabase,
        public angularAuth: AngularFireAuth,
        private router: Router,
        public db: AngularFirestore,

    ) {
        this.setupKeys();
        // this.logOut();
    }

    setupKeys() {
        this.angularAuth.authState.subscribe((firebaseUser) => {
            if (firebaseUser) {
                this.userData = firebaseUser;
            }
        });
    }

    getUserFromLocalStorage(): string {
        return localStorage.getItem('user');
    }

    registerUser(username, email, password) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(userDB => {
                this.authState.next(true);
                const batch = this.db.firestore.batch();

                localStorage.setItem('user', userDB.user.uid);
                this.user = userDB.user.uid;
                this.setupKeys();

                batch.set(this.db.firestore.collection(`users`).doc(this.user), {
                    creationDate: new Date(),
                    username,
                    email,
                    followers: 0
                });

                batch.commit().then(data => {
                    resolve(true);
                }, err => {
                    reject();
                });


            }, error => {
                reject(error);
            });
        });
    }

    logIn(username, password) {
        return new Promise((resolve, reject) => {

            this.db.collection('users').ref
                .where('username', '==', username)
                .get()
                .then(snapshots => {
                    if (snapshots.empty) {
                        reject();
                    } else {
                        snapshots.forEach(element => {
                            const email = element.data().email;
                            this.user = element.id;
                            localStorage.setItem('user', element.id);
                            this.setupKeys();
                            this.angularAuth.auth.signInWithEmailAndPassword(email, password).then((response) => {
                                resolve(true);
                            }, (err) => {
                                reject(err);
                            });
                        });
                    }
                });


        });
    }

    logOut() {
        return this.angularAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.user = null;
            this.router.navigateByUrl('auth');
        });
    }

    resetPassword(emailAddress) {
        const auth = firebase.auth();
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(emailAddress).then(() => {
                resolve(true);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
