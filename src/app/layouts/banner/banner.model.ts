export interface Type{
    name:string, 
    image:string,
    status:string
}

export class BannerModel{
    list:Type[]=[{name:"Main Banner", image:"", status:"Active"}];

    addIt(item:Type){
        this.list.push(item);
    }
}