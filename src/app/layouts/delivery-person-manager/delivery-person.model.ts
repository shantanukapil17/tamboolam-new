export interface Type{
    name:string, 
    email:string,
    profile:string,
    address:string,
    contact:number,
    rating:number,
    totalDeliveries:number
}

export class DeliveryPersonModel{
    list:Type[]=[{name:"Main Banner", email:"driver@gmail.com",profile:" ", address: "Address", contact: 99999999, rating: 4.5, totalDeliveries: 2}];

    addIt(item:Type){
        this.list.push(item);
    }
}