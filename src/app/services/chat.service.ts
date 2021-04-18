import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';

import { AngularFirestore} from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { combineLatest, Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import * as firebase from 'firebase';
// import { ChatMessage } from './models/chat-message.model';
import { query } from '@angular/animations';
import { map, switchMap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user:any;
  chatMessages:any;
  chatMessage:any;
  username:string;
  constructor(private http:HttpClient,private db:AngularFireDatabase,private router:Router,private adAuth:AngularFireAuth, private fs:AngularFirestore) { 
    this.adAuth.authState.subscribe(auth=>{
      if(auth!== undefined && auth!== null){
        this.user = auth;
      }
      localStorage.setItem('uid',auth.uid);
    })
  }
  getUser(){
    const userId = this.user.uid;
    const path = `/users/${userId}`
    return this.db.object(path);
  }

  get(chatId){
    return this.fs.collection('chats').doc(chatId).valueChanges();
  }

  async create(){
    this.adAuth.authState.subscribe(authData=>{
      // console.log(authData.uid)
      const data = {
        uid:authData.uid, 
        createdAt:Date.now(),
        count:0,
        messages:[]
      }
      const docref = this.fs.collection('chats').add(data);
      console.log(docref);
      docref.then(res=>{

        console.log(res.id);
        this.http.post('http://localhost:3000/api/v1/invoke/channel',{order_id:51511113233,channel_id:res.id,user_fs_id:authData.uid}).subscribe(channel_res=>{
          console.log(channel_res);
          if(channel_res['status']==true){
       
            this.fs.collection('rooms').doc(authData.uid).update({channelId:firebase.default.firestore.FieldValue.arrayUnion({"order_id":'dfdsdfgdsfv',"channelid":'GdyXErjSGO0Kp3rV58wO'})}) 
            // for()
            this.router.navigate(['chat',res.id]);
          }

        })

      })
      // return this.router.navigate(['chat',docref.])
    });
  }
  getGroupID(uid){
    this.fs.collection('rooms').doc(uid).valueChanges().subscribe(res=>{
      console.log(res);
    })
  }


  sendMessage(chatId,content){
    this.adAuth.authState.subscribe(authData=>{
      // console.log(authData.uid)
      const data = {
        uid:authData.uid,
        displayName:authData.displayName, 
        createdAt:Date.now(),
        content:content
      }

      if(authData.uid){
        const ref = this.fs.collection('chats').doc(chatId);
        return ref.update({messages:firebase.default.firestore.FieldValue.arrayUnion(data)});
      }
    });
  }
  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
    console.log(chat$);
    // chat$.pipe(switchMap(c=>{
    //   console.log(c)
    //   return ''
    // }))
    // chat$.subscribe(res=>{
    //   console.log(res);
    // })
    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.fs.doc(`users/${u}`).valueChanges()
        );
        console.log(userDocs);
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        console.log(chat);
        return chat;
      })
    );
  }

  // sendMessage(message){
  //   const timeStamp = this.getTimeStamp();
  //   const email = this.user.email;
  //   this.chatMessages =this.getMessages();
  //   console.log(this.chatMessages);
  //   this.chatMessages.push({
  //     message:message,
  //     timeSent:timeStamp,
  //     userName:this.username,
  //     email:email
  //   });
  //   console.log('called SendMessage()!')
  // }

  getMessages(){
    console.log('called getMessage()!')
    return this.db.list('messages',ref=>ref.limitToLast(25));
  }
  getMessagesOf(uid){
    const ref = this.fs.collection('users');
    ref.doc(uid).set({
      uid: uid,
      displayName:'saiyash',
      email: 'saikkdya@gmail.com',
    })
  }

  getAllUsers(){
    this.fs.collection('users').get().subscribe((result) => {
      const alluser = [];
      result.forEach(c=>{
        const user = c.data();
        alluser.push(user);
        console.log(alluser)
      })
    })
  }

  privateChat(currentUserId){
    let message = {
      message:'welcome',
      sentAt:new Date(),
      sentBy:currentUserId
    }
    this.fs.collection('messages').doc(currentUserId).collection('message').add(message)
  }







  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear()+'/'+(now.getUTCMonth()+1)+'/'+now.getUTCDate();
    const time = now.getUTCHours()+'/'+(now.getUTCMinutes())+'/'+now.getUTCSeconds();
    return (date+' '+ time);
  }
}
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyAQFTpqCdHeAbImEPw_GZCLuUmvxJytdMI",
//     authDomain: "saidemo-523c7.firebaseapp.com",
//     databaseURL: "https://saidemo-523c7.firebaseio.com",
//     projectId: "saidemo-523c7",
//     storageBucket: "saidemo-523c7.appspot.com",
//     messagingSenderId: "855264868612",
//     appId: "1:855264868612:web:26d56a1390c3b8e140f851",
//     measurementId: "G-692MXXM9J3"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>