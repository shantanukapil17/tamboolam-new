import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CategoryAdditionComponent } from '../category-manager/category-addition/category-addition.component';
import { CategoryListComponent } from '../category-manager/category-list/category-list.component';
import { AppBannerListComponent } from '../banner/app-banner-list/app-banner-list.component';
import { CreateBannerComponent } from '../banner/create-banner/create-banner.component';
import { SendNotificationComponent } from '../promotions/send-notification/send-notification.component';
import { NotificationHistoryComponent } from '../promotions/notification-history/notification-history.component';
import { ItemsListComponent } from '../items/items-list/items-list.component';
import { ItemsAdditionComponent } from '../items/items-addition/items-addition.component';
import { RestaurantAdditionComponent } from '../restaurant-manager/restaurant-addition/restaurant-addition.component';
import { RestaurantListComponent } from '../restaurant-manager/restaurant-list/restaurant-list.component';
import { CuisineAdditionComponent } from '../cuisine-manager/cuisine-addition/cuisine-addition.component';
import { CuisineListComponent } from '../cuisine-manager/cuisine-list/cuisine-list.component';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';
import { DeliveryPersonListComponent } from '../delivery-person-manager/delivery-person-list/delivery-person-list.component';
import { AddDeliveryPersonComponent } from '../delivery-person-manager/add-delivery-person/add-delivery-person.component';
import { DeliveryHistoryComponent } from '../delivery-person-manager/delivery-history/delivery-history.component';
import { MessengerComponent } from '../messenger/messenger.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UsersProfileComponent } from '../users/users-profile/users-profile.component';
import { AddEmployeeComponent } from '../employ-management/add-employee/add-employee.component';
import { EmployeeListComponent } from '../employ-management/employ-list/employee-list.component';
import { OffersListComponent } from '../offers/offers-list/offers-list.component';
import { CreateOffersComponent } from '../offers/create-offers/create-offers.component';
import { SalesComponent } from '../sales/sales.component';
import { SubscriptionListComponent } from '../subscription-packages/subscription-list/subscription-list.component';
import { AddSubscriptionComponent } from '../subscription-packages/add-subscription/add-subscription.component';
import { HealthyItemsListComponent } from '../healthy-kitchen/items-list/items-list.component';
import { DisputeManagerComponent } from '../dispute-manager/dispute-manager.component';

import { HealthyAddItemsListComponent } from '../healthy-kitchen/items-list/add-items/add-items.component';
import { HealthyMealPackagesComponent } from '../healthy-kitchen/meal-packages/meal-packages.component';
import { HealthyAddMealPackagesComponent } from '../healthy-kitchen/meal-packages/add-meal-packages/add-meal-packages.component';
import { HealthyAddDietPlansComponent } from '../healthy-kitchen/diet-plans/add-diet-plans/add-diet-plans.component';
import { HealthyDietPlansComponent } from '../healthy-kitchen/diet-plans/diet-plans.component';
import { HealthyOrdersComponent } from '../healthy-kitchen/orders/orders.component';
import { FaqComponent } from '../faq/faq.component';
import { FaqAddComponent } from '../faq/faq-add/faq-add.component';
import { FaqCatComponent } from '../faq-cat/faq-cat-list.component';
import { FaqCatAddComponent } from '../faq-cat/faq-cat-add/faq-cat-add.component';
import { AuthGuard } from './../../auth.guard';
import { SwitchScreensComponent } from '../switch-screens/switch-screens.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent},
    
    { path: 'category-addition',    component: CategoryAdditionComponent },
    { path: 'category-addition/:id/edit', component: CategoryAdditionComponent} ,
    { path: 'category-list',        component: CategoryListComponent},
    
    { path: 'app-banner-list',      component: AppBannerListComponent},
    { path: 'create-banner',        component: CreateBannerComponent},
    { path: 'create-banner/:id/edit', component: CreateBannerComponent} ,
    
    { path: 'send-notification',    component: SendNotificationComponent},
    { path: 'notification-history', component: NotificationHistoryComponent},

    { path: 'items-list',           component: ItemsListComponent},
    { path: 'items-addition',       component: ItemsAdditionComponent},
    { path: 'items-addition/:id/edit',component: ItemsAdditionComponent},
    
    { path: 'restaurant-addition',  component: RestaurantAdditionComponent},
    { path: 'restaurant-list',      component: RestaurantListComponent},
    { path: 'restaurant-addition/:id/edit',  component: RestaurantAdditionComponent},
    
    { path: 'cuisine-list',         component: CuisineListComponent},
    { path: 'cuisine-addition',     component: CuisineAdditionComponent},
    { path: 'cuisine-addition/:id/edit', component: CuisineAdditionComponent},
    
    { path: 'dispatcher',           component: DispatcherComponent},
    
    { path: 'delivery-person-list', component: DeliveryPersonListComponent},
    { path: 'delivery-history',     component: DeliveryHistoryComponent},
    { path: 'add-delivery-person',  component: AddDeliveryPersonComponent},
    { path: 'add-delivery-person/:id/edit', component: AddDeliveryPersonComponent},
    
    { path: 'messenger',            component: MessengerComponent},
    
    { path: 'users-list',           component: UsersListComponent},
    { path: 'users-profile/:id/view', component: UsersProfileComponent},
   
    { path: 'employee-list',        component: EmployeeListComponent},
    { path: 'add-employee',         component: AddEmployeeComponent},
    { path: 'add-employee/:id/edit',component: AddEmployeeComponent},
    
    { path: 'offers-list',          component: OffersListComponent},
    { path: 'create-offers',        component: CreateOffersComponent},
    { path: 'create-offers/:id/edit', component: CreateOffersComponent},
    
    { path: 'sales',                component: SalesComponent},
    
    { path: 'subscription-list',    component: SubscriptionListComponent},
    { path: 'add-subscription',     component: AddSubscriptionComponent},
    { path: 'add-subscription/:id/edit',     component: AddSubscriptionComponent},

    { path:'dispute-manager',       component: DisputeManagerComponent},

    { path:'healthy-kitchen/items-list', component:HealthyItemsListComponent},
    { path:'healthy-kitchen/add-items',  component:HealthyAddItemsListComponent},
    { path:'healthy-kitchen/add-items/:id/edit',  component:HealthyAddItemsListComponent},

    { path:'healthy-kitchen/meal-packages', component:HealthyMealPackagesComponent},
    { path:'healthy-kitchen/add-meal-packages', component:HealthyAddMealPackagesComponent},
    { path:'healthy-kitchen/add-meal-packages/:id/edit', component:HealthyAddMealPackagesComponent},

    { path:'healthy-kitchen/diet-plans', component:HealthyDietPlansComponent},
    { path:'healthy-kitchen/add-diet-plans', component:HealthyAddDietPlansComponent},
    { path:'healthy-kitchen/add-diet-plans/:id/edit', component:HealthyAddDietPlansComponent},
    
    { path:'healthy-kitchen/orders',    component:HealthyOrdersComponent},

    { path:'faq',                   component:FaqComponent},
    { path:'faq/add',              component:FaqAddComponent},
    { path:'faq/edit/:id',         component:FaqAddComponent},

    { path:'faq-cat',               component:FaqCatComponent},
    { path:'faq-cat/add',           component:FaqCatAddComponent},
    { path:'faq-cat/edit/:id',      component:FaqCatAddComponent},

    { path:'switchscreens',      component:SwitchScreensComponent},
    
];
