// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    cloudinary: {
        api_key: '537917933843222',
        cloud_name: 'dzvclpwar',
        api_secret: '-NtcnTOoPDfcunlT9s4B-20DGGw',
        upload: {
            url_video: 'https://api.cloudinary.com/v1_1/dzvclpwar/video/upload',
            url_image: 'https://api.cloudinary.com/v1_1/dzvclpwar/image/upload',
        },
        delete: {
            url_video: 'https://api.cloudinary.com/v1_1/dzvclpwar/video/destroy',
            url_image: 'https://api.cloudinary.com/v1_1/dzvclpwar/image/destroy',
        }
    }
};


export const firebaseConfig = {
    apiKey: 'AIzaSyDKDoE2lo_5a_YJMU9Bm2kn1B4tA8ZvS-A',
    authDomain: 'gamer-c39ef.firebaseapp.com',
    projectId: 'gamer-c39ef',
    storageBucket: 'gamer-c39ef.appspot.com',
    messagingSenderId: '654338276790',
    appId: '1:654338276790:web:7a31e760588f35ad841517',
    measurementId: 'G-0MSXLSEEGB'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
