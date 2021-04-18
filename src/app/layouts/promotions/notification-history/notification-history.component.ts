import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from './../notification.model';
import { NotificationType } from './../notification.model';
@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
//   styleUrls: ['./notification-history.component.css']
})

export class NotificationHistoryComponent implements OnInit {
 
 list:NotificationType[];

 constructor(){
    // this.list= new NotificationModel.list; 
 }

 ngOnInit() {
    this.list= new NotificationModel().list;
}

}
