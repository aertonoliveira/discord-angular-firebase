// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    databaseURL: "https://discord-angular-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyCGRUXYrAPcdxf5-RwXos_J_X7el9k_4Ns",
    authDomain: "discord-angular.firebaseapp.com",
    projectId: "discord-angular",
    storageBucket: "discord-angular.appspot.com",
    messagingSenderId: "835378471857",
    appId: "1:835378471857:web:9ebd4bebc57555f794d390",
    measurementId: "G-3PRGKGRS59"
  }
};

export const defaultPhotoURL: string = "https://firebasestorage.googleapis.com/v0/b/discord-clone-420ba.appspot.com/o/default-server-icon.png?alt=media&token=22b079f4-06b8-456b-a36a-4ce66471aa8a";
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
