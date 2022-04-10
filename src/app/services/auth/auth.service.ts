import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
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
    token: any;
    constructor(
        public storage: Storage,
        public database: AngularFireDatabase,
        private angularAuth: AngularFireAuth,
        private router: Router,
        public db: AngularFirestore,

    ) {
        this.storage.create();
    }

    registerUser(username, email, password) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(userDB => {

                this.storage.set('token', userDB.user.uid).then((response) => {
                    this.token = response;
                    this.authState.next(true);

                    const batch = this.db.firestore.batch();

                    const idUser = this.db.createId();

                    batch.set(this.db.firestore.collection(`users`).doc(idUser), {
                        creationDate: new Date(),
                        username,
                        email,
                    });

                    batch.commit().then(data => {
                        resolve(true);
                    }, err => {
                        reject();
                    });

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
                    snapshots.forEach(element => {
                        const email = element.data().email;

                        this.angularAuth.auth.signInWithEmailAndPassword(email, password).then((response) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });
                    });
                });


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
