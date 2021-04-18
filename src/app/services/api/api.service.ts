import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:any='http://localhost:3000'
  constructor(private http:HttpClient) { }


  getUsers(id){
    return this.http.get(this.host+'/api/v1/users/'+id);
  }





 
//  This function impelement for Role based login access
//  @param body - it is json body which contains email and ppassword 
 
  login(body) {
    return this.http.post(this.host+"/api/authlogin",body);
  }

  
  invokeCategory(data){
    return this.http.post(this.host+'/api/v1/invoke/category',data);
  }
  getCategory(){
    return this.http.get(this.host+'/api/v1/category');
  }

  getCategoryById(id){
    return this.http.get(this.host+'/api/v1/category/'+id);
  }

  updateCategory(id,data){
    return this.http.post(this.host+"/api/v1/update/category/"+id,data);
  }



  getCuisines(){
    return this.http.get(this.host+"/api/v1/cuisines");
  }

  getCuisineById(id){
    return this.http.get(this.host+"/api/v1/cuisine/"+id);
  }

  updateCuisine(id,data){
    return this.http.post(this.host+"/api/v1/update/cuisine/"+id,data);
  }



  // invokeNutrition(data){
  //   return this.http.post(this.host+'/api/v1/invoke/nutrition',data);
  // }

  // getNutrition(){
  //   return this.http.get(this.host+"/api/v1/nutrition")
  // }

  // getNutritionById(id){
  //   return this.http.get(this.host+'/api/v1/nutrition/'+id);
  // }

  // updateNutrition(id,data){
  //   return this.http.post(this.host+"/api/v1/update/nutrition/"+id,data);
  // }


  
  invokeRestaurant(data){
    return this.http.post(this.host+'/api/v1/invoke/restaurant',data);
  }

  getRestaurant(){
    return this.http.get(this.host+"/api/v1/restaurant")
  }

  getRestaurantById(id){
    return this.http.get(this.host+'/api/v1/restaurant/'+id);
  }

  updateRestaurant(id,data){
    return this.http.post(this.host+"/api/v1/update/restaurant/"+id,data);
  }


  invokeCoupons(data){
    return this.http.post(this.host+'/api/v1/invoke/coupons',data);
  }
  getCoupons(){
    return this.http.get(this.host+"/api/v1/coupons")
  }

  getCouponById(id){
    return this.http.get(this.host+'/api/v1/coupons/'+id);
  }

  updateCoupon(id,data){
    return this.http.post(this.host+"/api/v1/update/coupons/"+id,data);
  }

  
  invokeFoods(data){
    return this.http.post(this.host+'/api/v1/invoke/foods',data);
  }
  
  getfoodOptions(){
    return this.http.get(this.host+'/api/v1/foodoptions');
  }
  getFoods(){
    return this.http.get(this.host+"/api/v1/foods")
  }

  getFoodById(id){
    return this.http.get(this.host+'/api/v1/foods/'+id);
  }

  updateFood(id,data){
    return this.http.post(this.host+"/api/v1/update/foods/"+id,data);
  }
}
