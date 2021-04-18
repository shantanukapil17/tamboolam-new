import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:Observable<any>;
  private authState:any;
  constructor(public api:ApiService,private router:Router,private cs:ChatService,private fs:AngularFirestore,private afAuth:AngularFireAuth,private db:AngularFireDatabase) { 
    this.user = afAuth.authState;
  }

  authUser(){
    return this.user;
  }
  logout(){
    this.afAuth.signOut();
    this.router.navigate['/login']
  }
  get currentUserId(): string {
    console.log(this.authState);
    return this.authState != null ?this.authState['uid']:'';
  }


  firebaselogin(user){

    this.afAuth.signInWithEmailAndPassword(user.email,user.password).then((resolve)=>{
      console.log(resolve);
      const status = 'online';
      this.cs.user = resolve
      this.fs.collection('users').doc(resolve.user.uid).valueChanges().subscribe(res=>{
        console.log(res);
        this.authState = res;
        this.setUserStatus(status);
        this.router.navigate(['/dashboard']);
      })
    })
  }
  setUserData(email, displayName, status){
    const path = `users/${this.currentUserId}`;
    const data = {
      email:email,
      displayName:displayName,
      status:status
    };
    this.db.object(path).update(data).catch((e)=>console.log(e));;
  }

  setUserStatus(status){
    const path = `users/${this.currentUserId}`;
    const data = {
      status:status
    }
  }
}
