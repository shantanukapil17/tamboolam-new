export interface NotificationType{
    name:string,
    image:string,
    sentTime: Date
}

export class NotificationModel{
    list:NotificationType[]=[{name:"Main Banner", image:"", sentTime: new Date()}];

    addIt(item:NotificationType){
        this.list.push(item);
    }
}