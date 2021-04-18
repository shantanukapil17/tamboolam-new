 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],  
})

export class MessengerComponent implements OnInit {
 

  // messageForm:FormGroup;
  // chat$: Observable<any>;
  // newMsg: string;
  // chatid:any;
  // // uid:any;
  // data:any;
  // chatRooms:any;
  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private http:HttpClient,
    public api:ApiService
  ) {}

  ngOnInit(){
    const uid = localStorage.getItem('uid');
    this.cs.getGroupID(uid);
    this.api.getChannels(uid).subscribe(res=>{
      console.log(res);
    })
  }
  // async ngOnInit() {
  //   const uid = localStorage.getItem('uid');
  //   this.cs.getGroupID(uid);
  //   this.http.post('http://localhost:3000/api/v1/channel',{user_fs_id:uid}).subscribe(res=>{
  //     console.log(res);
  //     this.chatRooms = res;
  //   })
  //   this.route.params.subscribe(res=>{
  //     console.log(res);
  //     this.chatid = res.id;
  //   })
  //   this.cs.getGroupID(this.cs.user.uid);
  //   const source = this.cs.get(this.chatid);
  //   await this.cs.get(this.chatid).subscribe(res=>{
  //     this.data = res;
  //     // this.uid = this.data['uid'];
  //     console.log(this.data);
      
  //   });
  // }

  // submit(chatId) {
  //   this.cs.sendMessage(chatId, this.newMsg);
  //   this.newMsg = '';
  // }

  // trackByCreated(i, msg) {
  //   return msg.createdAt;
  // }


}
