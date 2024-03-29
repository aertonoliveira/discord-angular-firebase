import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {GoogleAuthProvider} from "@angular/fire/auth";
import {first} from "rxjs/operators";
import firebase from "firebase/compat";
import {defaultPhotoURL} from "../../environments/environment";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface AuthResponse {
  isSuccess: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  userRef: any;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userRef = this.afs.collection('users').doc(user.uid).ref;
      }
    })

  }

  get authState() {
    return this.auth.authState;
  }

  signIn(email: string, password: string) {
    return new Promise(resolve => {
      this.auth.signInWithEmailAndPassword(email, password).then((result) => {
        if (result.user) {
          this.afs.doc(`users/${result.user.uid}`).get().pipe(first(res => res != null)).subscribe((next: any) => {
            if (result.user) {
              result.user.updateProfile({
                displayName: next.data().displayName,
                photoURL: next.data().photoURL
              }).then(() => {
                this.router.navigate(['']);
                resolve(true)
              })
            } else {
              resolve(false)
            }
          })
        } else {
          resolve(false)
        }
      }).catch(() => {
        resolve(false)
      })
    })
  }

  // signUp(email: string, password: string, displayName: string) {
  //   return new Observable<AuthResponse>(resolve => {
  //     this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
  //       if (result.user) {
  //         result.user.updateProfile({
  //           displayName: displayName,
  //           photoURL: defaultPhotoURL
  //         }).then(() => {
  //           this.setUserData(result.user);
  //           this.router.navigate([''])
  //           return {isSuccess: true, message: ''}
  //         })
  //       } else {
  //         return this.createErrorResponse('')
  //       }
  //     }).catch((error) => {
  //       return this.createErrorResponse(error.code)
  //     })
  //   })
  // }

  public signup(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
//Set user data in the firebase users collection
  setUserData(user: any) {
    if (user != null) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }
      userRef.set(userData, {merge: true})
    }
  }

  // Sign in with Google
  googleAuth() {
    return this.auth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      this.setUserData(result.user);
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
  }

  // Sign out
  signOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

  createErrorResponse(errorCode: string){
    let message: string = '';
    switch(errorCode){
      case 'auth/email-already-in-use': {
        message = "L'email est déjà utilisé."
        break
      }
      default : {
        message = "Une erreur s'est produite, veuillez réessayer."
        break
      }
    }
    let response: AuthResponse = {
      isSuccess: false,
      message: message
    }
    return response
  }

}
