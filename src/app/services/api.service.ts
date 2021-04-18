import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:any='http://localhost:3000';
  public baseUrl = 'https://ba5973730ade.ngrok.io/api/';




  constructor(private http:HttpClient) { }

  
  
  /**
 * This function impelement for Role based login access
 * @param body - it is json body which contains email and ppassword 
 */
  login(body) {
    return this.http.post("http://localhost:3000/api/authlogin",body);
  }

  invokeCuisines(data){
    return this.http.post(this.host+'/api/v1/invoke/cuisine',data);
  }

  getCuisines(){
    return this.http.get(this.host+"/api/v1/cuisines");
  }

  getCuisineById(id){
    return this.http.get(this.host+"/api/v1/cuisine/"+id);
  }

  // updateCuisine(id,data){
  //   return this.http.post(this.host+"/api/v1/update/cuisine/"+id,data);
  // }

  removeCuisine(id){
    return this.http.get(this.host+"/api/v1/delete/cuisine/"+id);
  }
  
  
  invokeCategory(data){
    return this.http.post(this.host+'/api/v1/invoke/category',data);
  }

  
  getcategory(){
    return this.http.get(this.host+'/api/v1/category');
  }

  getCategoryById(id){
    return this.http.get(this.host+'/api/v1/category/'+id);
  }

  updateCategory(id,data){
    return this.http.post(this.host+"/api/v1/update/category/"+id,data);
  }
  
  removeCategory(id){
    return this.http.get(this.host+"/api/v1/delete/category/"+id);
  }

  getChannels(uid){
    return this.http.post(this.host+"/api/v1/channel",{user_fs_id:uid});
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

  updateRestaurant(data){
    return this.http.post(this.host+'/api/v1/update/restaurant/',data);
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

  removeCoupon(id){
    return this.http.get(this.host+"/api/v1/delete/coupons/"+id);
  }
  
  

  getfoodOptions(){
    return this.http.get(this.host+'/api/v1/foodoptions');
  }

  
  invokeFoods(data){
    return this.http.post(this.host+'/api/v1/invoke/food',data);
  }

  getFoods(){
    return this.http.get(this.host+"/api/v1/food")
  }
  
  getFoodById(id){
    return this.http.get(this.host+'/api/v1/food/'+id);
  }

  updateFood(id,data){
    return this.http.post(this.host+"/api/v1/update/food/"+id,data);
  }

  removeFood(id){
    return this.http.get(this.host+'/api/v1/delete/food/'+id);
  }

  
  uploadImage(data){
    return this.http.post(this.host+'/api/v1/upload',data);
  }
  
  getPeopleDetails(){
    return this.http.get(this.host+'/api/v1/users');
  }

  addPeopleDetails(data){
    return this.http.post(this.host+'/api/member-signup',data);
  }

  removePeopleDetails(id){
    console.log('cal');
    return this.http.get(this.host+'/api/removeuser/'+id);
  }
  
  updatePeopleDetails(data){
    return this.http.post(this.host+'/api/update/member',data);
  }
  
  getPeopleDetailsById(id){
    return this.http.get(this.host+'/api/v1/users/'+id);
  }

  getDriversDetails(){
    return this.http.get(this.host+'/api/v1/user/drivers');
  }

  getDriversDetailsById(id){
    return this.http.get(this.host+'/api/v1/users/drivers/'+id);
  }
  
  getUsers(){
    return this.http.get(this.host+'/api/v1/appusers');
  }

  getUsersById(id){
    console.log(id);
    return this.http.get(this.host+'/api/v1/appusers/'+id);
  }

  updateOrderStatus(data){
    return this.http.post(this.host+'/api/v1/update-orderstatus',data);
  }

  getPlacedConfirmedOrders(){
    return this.http.get(this.host+'/api/v1/getallorders');
  }

  getCancelOrders(){
    return this.http.get(this.host+'/api/v1/cancel-orders');
  }
  
  getDeliveredOrders(){
    return this.http.get(this.host+'/api/v1/delivered-orders');
  }

  getOngoingOrders(){
    return this.http.get(this.host+'/api/v1/ongoing-orders');
  }


  getHealthyKitchenItems(){
    return this.http.get(this.host+'/api/v1/hk-food-items');
  }

  getHealthyKitchenItemsById(id){
    return this.http.get(this.host+'/api/v1/hk-food-items/'+id);
  }

  updateHealthyKitchenItems(data){
    return this.http.post(this.host+'/api/v1/update/hk-food-items/',data);
  }

  addHealthyKitchenItems(data){
    return this.http.post(this.host+'/api/v1/invoke/hk-food-items/',data);
  }

  removeHealthyKitchenItems(id){
    return this.http.get(this.host+'/api/v1/delete/hk-food-items/'+id);
  }

  addHealthyKitchenMealItems(data){
    return this.http.post(this.host+'/api/v1/invoke/hk-meal-items/',data);
  }
  
  getHealthyKitchenMealItems(){
    console.log('called');
    return this.http.get(this.host+'/api/v1/hk-meal-items');
  }

  getHealthyKitchenMealItemsById(id){
    return this.http.get(this.host+'/api/v1/hk-meal-items/'+id);
  }

  updateHealthyKitchenMealItems(data){
    return this.http.post(this.host+'/api/v1/update/hk-meal-items',data);
  }

  removeHealthyKitchenMealItems(id){
    return this.http.get(this.host+'/api/v1/delete/hk-meal-items/'+id);
  }


  addHealthyKitchenDietPlan(data){
    return this.http.post(this.host+'/api/v1/invoke/hk-dite-plan/',data);
  }

  getHealthyKitchenDietPlan(){
    return this.http.get(this.host+'/api/v1/hk-dite-plan');
  }

  getHealthyKitchenDietPlanById(id){
    return this.http.get(this.host+'/api/v1/hk-dite-plan/'+id);
  }

  updateHealthyKitchenDietPlan(data){
    return this.http.post(this.host+'/api/v1/update/hk-dite-plan',data);
  }

  removeHealthyKitchenDietPlan(id){
    return this.http.get(this.host+'/api/v1/delete/hk-dite-plan/'+id);
  }


  addBanners(data){
    return this.http.post(this.host+'/api/v1/invoke/banners',data);
  }

  getBanners(){
    return this.http.get(this.host+'/api/v1/banners');
  }

  getBannersById(id){
    return this.http.get(this.host+'/api/v1/banners/'+id);
  }

  updateBanners(data){
    return this.http.post(this.host+'/api/v1/update/banners',data);
  }

  removeBanners(id){
    return this.http.get(this.host+'/api/v1/delete/banners/'+id);
  }

  removeActiveBanners(){
    return this.http.get(this.host+'/api/v1/delete/banners-active_status');
  }


  addFaq(body:any){
    return this.http.post(this.host+'/api/v1/invoke/faqs',body);
  }

  getFaq(){
    return this.http.get(this.host+'/api/v1/faqs');
  }

  getFaqById(id:any){
    return this.http.get(this.host+'/api/v1/faqs/'+id);
  }
  
  updateFaq(id:any,body:any){
    return this.http.post(this.host+'/api/v1/update/faqs/'+id,body);
  }

  removeFaq(id:any){
    return this.http.post(this.host+'/api/v1/delete/faqs/',{'id':id});
  }


  
  addFaqCat(body:any){
    return this.http.post(this.host+'/api/v1/invoke/faq-cat',body);
  }

  getFaqCat(){
    return this.http.get(this.host+'/api/v1/faq-cat');
  }

  getFaqCatById(id:any){
    return this.http.get(this.host+'/api/v1/faq-cat/'+id);
  }
  
  updateFaqCat(id:any,body:any){
    return this.http.post(this.host+'/api/v1/update/faq-cat',body);
  }

  getSwitchscreen(){
    return this.http.get(this.host+"/api/v1/getswitchscreens");
  }  

  updateSwitchscreen(body){
    return this.http.post(this.host+"/api/v1/update/switchscreens",body);
  }

  sendOtp(body){
    return this.http.post("https://thambolam.herokuapp.com/api/v1/sendotp", body);
  }

  verifyOtp(body){
    return this.http.post("https://thambolam.herokuapp.com/api/v1/verifyotp", body);
  }

  getAllOrders(body){
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/order/getAllOrders",body);
  }

  getAllRestaurants(body?:any) {
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/restaurant/getAllRestaurants",body);
  }

  addCuisine(body:any) {
    return this.http.post("https://spontom-thambolam.herokuapp.com/api/v1/cuisine/insertCuisine",body);
  }

  getCuisine(body?:any) {
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/cuisine/getAllCuisines",body);
  }
  
  addCategory(body:any) {
    return this.http.post("https://spontom-thambolam.herokuapp.com/api/v1/category/insertCategory",body);
  }

  getCategory(body?:any) {
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/category/getAllCategories",body);
  }

  addItem(body:any) {
    return this.http.post("https://spontom-thambolam.herokuapp.com/api/v1/item/insertItem",body);
  }

  getItems(body?:any) {
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/item/getAllItems",body);
  }

  addDeliveryPersonData(body:any){
    return this.http.post("https://spontom-thambolam.herokuapp.com/api/v1/user/signup",body);
  }

  getDeliveryPersonData(body?:any){
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/user/getAllUsers",body);
  }

  getSwitchScreenData(body?:any){
    return this.http.get("https://spontom-thambolam.herokuapp.com/api/v1/switchScreen/getAllSwitchScreens",body);
  }

  updateSwitchScreen(id:any, body:any) {
  return this.http.put("https://spontom-thambolam.herokuapp.com/api/v1/switchScreen/"+id,body);
  }

  deleteRestaurant(id:any, body?:any) {
    return this.http.delete("https://spontom-thambolam.herokuapp.com/api/v1/restaurant/"+id,body);
  }

  deleteCuisine(id:any, body?:any) {
    return this.http.delete("https://spontom-thambolam.herokuapp.com/api/v1/cuisine/"+id,body);
  }

  deleteCategory(id:any, body?:any) {
    return this.http.delete("https://spontom-thambolam.herokuapp.com/api/v1/category/"+id,body);
  }

  deleteItem(id:any, body?:any) {
    return this.http.delete("https://spontom-thambolam.herokuapp.com/api/v1/item/"+id,body);
  }

  removedeliveryPersonDetails(id:any, body?:any) {
    return this.http.delete("https://spontom-thambolam.herokuapp.com/api/v1/user/"+id,body);
  }

  updateCuisineById(id:any, body?:any) {
    return this.http.put("https://spontom-thambolam.herokuapp.com/api/v1/cuisine/"+id,body);
  }

  updateCategoryById(id:any, body?:any) {
    return this.http.put("https://spontom-thambolam.herokuapp.com/api/v1/category/"+id,body);
  }

  updateItemById(id:any, body?:any) {
    return this.http.put("https://spontom-thambolam.herokuapp.com/api/v1/item/"+id,body);
  }

  updateDeliveryPersonDataById(id:any, body?:any) {
    return this.http.put("https://spontom-thambolam.herokuapp.com/api/v1/user/"+id,body);
  }

}

