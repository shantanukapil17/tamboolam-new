import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { CategoryAdditionComponent } from '../category-manager/category-addition/category-addition.component';
import { CategoryListComponent } from '../category-manager/category-list/category-list.component';
import { AppBannerListComponent } from '../banner/app-banner-list/app-banner-list.component';
import { CreateBannerComponent } from '../banner/create-banner/create-banner.component';
import { SendNotificationComponent } from '../promotions/send-notification/send-notification.component';
import { NotificationHistoryComponent } from '../promotions/notification-history/notification-history.component';
import { ItemsListComponent } from '../items/items-list/items-list.component';
import { CuisineAdditionComponent } from '../cuisine-manager/cuisine-addition/cuisine-addition.component';
import { CuisineListComponent } from '../cuisine-manager/cuisine-list/cuisine-list.component';
import { RestaurantListComponent } from '../restaurant-manager/restaurant-list/restaurant-list.component';
import { RestaurantAdditionComponent } from '../restaurant-manager/restaurant-addition/restaurant-addition.component';
import { DeliveryPersonListComponent } from '../delivery-person-manager/delivery-person-list/delivery-person-list.component';
import { AddDeliveryPersonComponent } from '../delivery-person-manager/add-delivery-person/add-delivery-person.component';
import { DeliveryHistoryComponent } from '../delivery-person-manager/delivery-history/delivery-history.component';
import { MessengerComponent } from '../messenger/messenger.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UsersProfileComponent } from '../users/users-profile/users-profile.component';
import { AddEmployeeComponent } from '../employ-management/add-employee/add-employee.component';
import { EmployeeListComponent } from '../employ-management/employ-list/employee-list.component';
import { OffersListComponent } from '../offers/offers-list/offers-list.component';
import { SalesComponent } from '../sales/sales.component';
import { CreateOffersComponent } from '../offers/create-offers/create-offers.component';
import { AddSubscriptionComponent } from '../subscription-packages/add-subscription/add-subscription.component';
import { SubscriptionListComponent } from '../subscription-packages/subscription-list/subscription-list.component';
import { ItemsAdditionComponent } from '../items/items-addition/items-addition.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';
import { HealthyAddItemsListComponent } from '../healthy-kitchen/items-list/add-items/add-items.component';
import { HealthyItemsListComponent } from '../healthy-kitchen/items-list/items-list.component';
import { HealthyMealPackagesComponent } from '../healthy-kitchen/meal-packages/meal-packages.component';
import { HealthyAddMealPackagesComponent } from '../healthy-kitchen/meal-packages/add-meal-packages/add-meal-packages.component';
import { HealthyDietPlansComponent } from '../healthy-kitchen/diet-plans/diet-plans.component';
import { HealthyAddDietPlansComponent } from '../healthy-kitchen/diet-plans/add-diet-plans/add-diet-plans.component';
import { HealthyOrdersComponent } from '../healthy-kitchen/orders/orders.component';
import { DisputeManagerComponent } from '../dispute-manager/dispute-manager.component';
import { FaqComponent } from '../faq/faq.component';
import { FaqAddComponent } from '../faq/faq-add/faq-add.component';
import { FaqCatComponent } from '../faq-cat/faq-cat-list.component';
import { FaqCatAddComponent } from '../faq-cat/faq-cat-add/faq-cat-add.component';
// import { ChatBot } from 'angular-ai-chat-bot';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule
  ],
  declarations: [
    CategoryAdditionComponent,
    CategoryListComponent,
    AppBannerListComponent,
    CreateBannerComponent,
    SendNotificationComponent,
    NotificationHistoryComponent,
    ItemsListComponent,
    ItemsAdditionComponent,
    CuisineAdditionComponent,
    CuisineListComponent,
    RestaurantAdditionComponent,
    RestaurantListComponent,
    DispatcherComponent,
    DeliveryPersonListComponent,
    AddDeliveryPersonComponent,
    DeliveryHistoryComponent,
    MessengerComponent,
    DashboardComponent,
    UsersProfileComponent,
    UsersListComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    OffersListComponent,
    CreateOffersComponent,
    SalesComponent,
    SubscriptionListComponent,
    AddSubscriptionComponent,
    HealthyAddItemsListComponent,
    HealthyItemsListComponent,
    HealthyMealPackagesComponent,
    HealthyAddMealPackagesComponent,
    HealthyDietPlansComponent,
    HealthyAddDietPlansComponent,
    HealthyOrdersComponent,
    DisputeManagerComponent,
    FaqComponent,
    FaqAddComponent,
    FaqCatComponent,
    FaqCatAddComponent
    // ChatBot
  ],
  providers: [  
    MatDatepickerModule,  
    MatNativeDateModule
  ]
})

export class AdminLayoutModule {}
