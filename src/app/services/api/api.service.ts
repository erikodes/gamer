import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { ComponentsService } from '../components/components.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        public db: AngularFirestore,
        public storage: Storage,
        public auth: AuthService,
        public components: ComponentsService,
        public router: Router
    ) { }


    getStorage(key) {
        return new Promise((resolve, reject) => {
            this.storage.get(key).then((response) => {
                resolve(String(response));
            });
        });
    }



    ///////////////////////////////
    // GENERIC CRUD API REQUESTS
    ///////////////////////////////
    getAllDocuments(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection(collection)
                .get()
                .toPromise()
                .then((querySnapshot) => {
                    const arr = [];
                    querySnapshot.forEach(doc => {
                        const obj = JSON.parse(JSON.stringify(doc.data()));
                        obj.$key = doc.id;
                        arr.push(obj);
                    });

                    if (arr.length > 0) {
                        resolve(arr);
                    } else {
                        resolve(null);
                    }


                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    getDocument(collection, documentId) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).doc(documentId)
                .get()
                .toPromise()
                .then((snapshot) => {
                    const doc = snapshot.data();
                    doc.$key = snapshot.id;
                    resolve(doc);
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    deleteDocument(collectionName: string, docID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection(collectionName)
                .doc(docID)
                .delete()
                .then((obj: any) => {
                    resolve(obj);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    addDocument(collectionName: string, dataObj: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection(collectionName).add(dataObj)
                .then((obj: any) => {
                    resolve(obj);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection(collectionName)
                .doc(docID)
                .update(dataObj)
                .then((obj: any) => {
                    resolve(obj);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    setDocument(collectionName: string, docID: string, dataObj: any) {
        return new Promise((resolve, reject) => {
            this.db
                .collection(collectionName)
                .doc(docID)
                .set(dataObj)
                .then((obj: any) => {
                    resolve(obj);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    getRef(collection) {
        return this.db.collection(collection);
    }

}
