import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: { child: { path: string, title: string }[], visibile: boolean } | false;
}
export const ROUTES: RouteInfo[] = [
  { 
    path: '/dashboard', 
    title: 'Dashboard', 
    icon: 'dashboard', 
    class: '', 
    children: false 
  },
  { 
    path: '/switchscreens', 
    title: 'Switch Screens', 
    icon: 'dashboard', 
    class: '', 
    children: false 
  },
  { 
    path: '/dispatcher', 
    title: 'Dispatcher', 
    icon: 'list_alt', 
    class: '', 
    children: false 
  },
  { 
    path: '/messenger', 
    title: 'Messenger', 
    icon: 'messenger', 
    class: '', 
    children: false 
  },
  {
    path: '/restaurant-manager', 
    title: 'Restaurant Manager', 
    icon: 'account_balance_walletager', 
    class: '',
    children: {
      child: [
        { path: '/restaurant-addition', title: 'Restaurant Addition' },
        { path: '/restaurant-list', title: ' Restaurant List' }
      ], visibile: false
    }
  },
  {
    path: '/cuisine', title: 'Cuisine Manager', icon: 'restaurant', class: '',
    children: {
      child: [
        { path: '/cuisine-addition', title: 'Cuisine Addition' },
        { path: '/cuisine-list', title: 'Cuisine List' },
      ], visibile: false
    }
  },
  {
    path: '/category', title: 'Category Manager', icon: 'menu_book', class: '',
    children: {
      child: [
        { path: '/category-addition', title: 'Category Addition' },
        { path: '/category-list', title: 'Category List' }
      ], visibile: false
    }
  },
  {
    path: '/items', title: 'Items Manager', icon: 'room_service', class: '',
    children: {
      child: [
        { path: '/items-addition', title: 'Items Addition' },
        { path: '/items-list', title: 'Items List' }
      ], visibile: false
    }
  },
  {
    path: '/delivery-person-manager', title: 'Delivery Person Manager', icon: 'sports_motorsports', class: '',
    children: {
      child: [
        { path: '/add-delivery-person', title: 'Add Delivery Person' },
        { path: '/delivery-person-list', title: 'Delivery Person List' },
        { path: '/delivery-history', title: 'Delivery History' }
      ], visibile: false
    }
  },
  {
    path: '/dispute-manager', title: 'Dispute Manager', icon: 'contact_support', class: '', children:false},
    // children: {
    //   child: [
    //     { path: '/customer-dispute', title: ' Customer Disputes' },
    //     { path: '/delivery-boy-disputes', title: 'Delivery Boy Disputes' },
    //     { path: '/restaurant-disputes', title: 'Restaurant Disputes' }
    //   ], visibile: false
    // }
  // },
  {
    path: '/banners', title: 'Banners', icon: 'aspect_ratio', class: '',
    children: {
      child: [
        { path: '/create-banner', title: 'Create Banner' },
        { path: '/app-banner-list', title: 'App Banner List' }
      ], visibile: false
    }
  },
  {
    path: '/promotions', title: 'Promotions', icon: 'emoji_flags', class: '',
    children: {
      child: [
        { path: '/send-notification', title: 'Send Notification' },
        { path: '/notification-history', title: 'Notification History' }
      ], visibile: false
    }
  },
  {
    path: '/subscription-package', title: 'Subscription Package', icon: 'subscriptions', class: '',
    children: {
      child: [
        { path: '/subscription-list', title: 'Subscriptions List' },
        { path: '/add-subscription', title: 'Add Subscription' }
      ], visibile: false
    }
  },
  { path: '/sales', title: 'Sales', icon: 'point_of_sale', class: '', children: false },

  { path: '/offers', title: 'Offers', icon: 'local_offer', class: '',  
  children:{
    child:[
      { path:'/create-offers', title:'Create Offers'},
      { path:'/offers-list', title:'Offers List'}
    ],visibile:false}},

  { path: '/employ-management', title: 'Employ Management', icon: 'face', class: '', 
  children:{
    child:[
      { path:'/add-employee', title:'Add Employee'},
      { path:'/employee-list', title:'Employee List'}
    ],visibile:false}},
  { path: '/users-list', title: 'Users', icon: 'supervisor_account', class: '', children:false}, 

  { path:'/healthy-kitchen', title: 'Healthy Kitchen' , icon: 'eco', class:'', 
    children:{
      child:[
        { path:'/healthy-kitchen/items-list', title:'Items List'},
        { path:'/healthy-kitchen/meal-packages', title:'Meal Packages'},
        { path:'/healthy-kitchen/diet-plans', title:'Diet Plans'},
        { path:'/healthy-kitchen/orders', title:'Orders'}
      ],visibile:false}},
  { path:'/faq', title: 'FAQs', icon: 'not_listed_location' , class:'', 
  children:{
    child:[
      {path:'/faq', title: 'FAQs List'},
      {path:'/faq-cat', title: 'FAQs Categories'}
  ], visibile:false} }      

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
