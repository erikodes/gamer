import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { ComponentsService } from '../components/components.service';
import CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        public db: AngularFirestore,
        public storage: Storage,
        public auth: AuthService,
        public components: ComponentsService,
        public router: Router,
        private http: HttpClient
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

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    getRef(collection) {
        return this.db.collection(collection);
    }

    ///////////////////////////////
    // CLOUDINARY
    ///////////////////////////////

    uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {

            const timestamp = Math.round((new Date).getTime() / 1000);

            let public_id = this.makeid(20);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", environment.cloudinary.api_key);
            formData.append("public_id", public_id);
            formData.append("return_delete_token", "1");
            formData.append("timestamp", String(timestamp));
            var signature = CryptoJS.SHA1(`public_id=${public_id}&return_delete_token=1&timestamp=${String(timestamp)}${environment.cloudinary.api_secret}`);
            formData.append("signature", String(signature));
            this.http.post(environment.cloudinary.upload.url, formData)
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    console.log(error);

                    reject(error);
                });

        })
    }

    deleteToCloudinary(image) {
        return new Promise((resolve, reject) => {
            const timestamp = Math.round((new Date).getTime() / 1000);

            const formData = new FormData();
            formData.append("api_key", environment.cloudinary.api_key);
            formData.append("public_id", image.public_id);
            formData.append("timestamp", String(timestamp));
            var signature = CryptoJS.SHA1(`public_id=${image.public_id}&timestamp=${String(timestamp)}${environment.cloudinary.api_secret}`);
            formData.append("signature", String(signature));
            this.http.post(environment.cloudinary.delete.url, formData)
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                });

        })
    }

    getLikeByUser(clipKey) {
        return new Promise((resolve, reject) => {
            this.db.collection('clips')
                .doc(clipKey)
                .collection('likes')
                .doc(this.auth.user)
                .get()
                .toPromise()
                .then((snapshot) => {
                    resolve(snapshot.exists);
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    updateLike(clip) {
        return new Promise((resolve, reject) => {
            if (clip.isLiked) {
                this.db.collection('clips')
                    .doc(clip.$key)
                    .collection('likes')
                    .doc(this.auth.user)
                    .delete()
            } else {
                this.db.collection('clips')
                    .doc(clip.$key)
                    .collection('likes')
                    .doc(this.auth.user)
                    .set({})
            }

            this.db.collection('clips')
                .doc(clip.$key)
                .update({
                    likes: clip.likes
                })
        });
    }

    getFollowStatus(userKey) {
        return new Promise((resolve, reject) => {
            this.db.collection('users')
                .doc(userKey)
                .collection('followers')
                .doc(this.auth.user)
                .get()
                .toPromise()
                .then((snapshot) => {
                    resolve(snapshot.exists);
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    updateFollowStatus(user) {
        return new Promise((resolve, reject) => {
            if (user.isFollowed) {
                this.db.collection('users')
                    .doc(user.$key)
                    .collection('followers')
                    .doc(this.auth.user)
                    .delete()
            } else {
                this.db.collection('users')
                    .doc(user.$key)
                    .collection('followers')
                    .doc(this.auth.user)
                    .set({})
            }

            this.db.collection('users')
                .doc(user.$key)
                .update({
                    followers: user.followers
                })
        });
    }
}
