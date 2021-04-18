export interface Type{
    name:string, 
    category:string,
    cuisine:string
}

export class ItemsModel{
    list:Type[]=[{name:"Item Name", category:"Starters", cuisine:"Indian"}];

    addIt(item:Type){
        this.list.push(item);
    }
}