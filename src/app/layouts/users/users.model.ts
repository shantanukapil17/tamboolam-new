export interface Type{
    name:string, 
    email:string,
    phone:number,
    photo:string,
    accountCreation:Date,
}

export class UsersModel{
    list:Type[]=[{name:"Main Banner", email:"driver@gmail.com",phone:999999, photo:" ", accountCreation: new Date()}];

    addIt(item:Type){
        this.list.push(item);
    }
}