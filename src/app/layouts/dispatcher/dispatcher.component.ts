import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styles: ['div.order{height:35rem;overflow: auto;}']
})
export class DispatcherComponent implements OnInit {

  ongoingOrderList=[];
  acceptedOrderList=[];
  deliveredOrderList=[];
  newOrderList=[];
  allOrderList = [];
  public orderId: any;
  public userName: any;
  public userPhone: any;
  public totalAmount: any;
  public restaurantName:any;
  public restaurantList:any;
  public note:any;
  public deliveryAddress: any;
  public line1: any;
  public line2: any;
  public line3: any;

  dummynewOrderList = [
    {order_id: 1, 
    user_name: 'shantanu',
    phone: '8279579101'},
    {order_id: 2, 
      user_name: 'raj',
      phone: '8279579102'},
      {order_id: 3, 
        user_name: 'kapil',
        phone: '8279579103'}
  ]
  dummyacceptedOrderList = [
    {order_id: 1, 
      user_name: 'shantanu',
      phone: '8279579101'},
      {order_id: 2, 
        user_name: 'raj',
        phone: '8279579102'},
        {order_id: 3, 
          user_name: 'kapil',
          phone: '8279579103'}
  ]

  dummyongoingOrderList=[
    {order_id: 1, 
      appuser_name: 'shantanu',
      appuser_phone: '8279579101'},
      {order_id: 2, 
        appuser_name: 'raj',
        appuser_phone: '8279579102'},
        {order_id: 3, 
          appuser_name: 'kapil',
          appuser_phone: '8279579103'}
  ]

  dummydeliveredOrderList = [
    {order_id: 1, 
      user_name: 'shantanu',
      phone: '8279579101'},
      {order_id: 2, 
        user_name: 'raj',
        phone: '8279579102'},
        {order_id: 3, 
          user_name: 'kapil',
          phone: '8279579103'}
  ]


  constructor(private api:ApiService,
    private modalService: NgbModal) {
    
   }

  ngOnInit() {

    this.api.getAllRestaurants({
    }).subscribe((res:any) => {
      this.restaurantList = res.response.result
    }, err => {
    })

      this.api.getAllOrders({
        // params: {
        //   limit: 2,
        //   page: 1,
        // },
      }).subscribe((res:any) => {
        res.response.order.forEach((element:any) => {
          this.allOrderList.push(element);
        })
      }, err => {
      })
  }

  openScrollableContent(orderDetail:any, id:any, restaurantName:any, username:any, deliveryaddress:any, userphone:any, note:any, subTotal:any) {
    this.orderId = id;
    this.userName = username;
    this.userPhone = userphone;
    this.totalAmount = subTotal;
    this.restaurantName = restaurantName;
    this.note = note;
    // this.deliveryAddress = deliveryaddress;
    this.line1 = deliveryaddress ? deliveryaddress.line1 ? deliveryaddress.line1 : '-' : '-';
    this.line2 = deliveryaddress ? deliveryaddress.line2 ? deliveryaddress.line3 : '-' : '-';
    this.line3 = deliveryaddress ? deliveryaddress.line2 ? deliveryaddress.line3 : '-' : '-';
    this.deliveryAddress = this.line1 + ' ,' + this.line2 + ' ,' + this.line3;
    this.modalService.open(orderDetail, { scrollable: true });
  }

  switchTab(tab:any) {
    this.allOrderList = [];
    this.api.getAllOrders({
      params: {
        limit: 2,
        page: 1,
        status: tab,
      },
    }).subscribe((res:any) => {
      res.response.order.forEach((element:any) => {
        this.allOrderList.push(element);
      })
    }, err => {
    })
  }

  onRestaurantSelect(event:any) {
    console.log('event',event.value);
    this.api.getAllOrders({
      params: {
        limit: 2,
        page: 1,
        restaurant_id: event.value
      },
    }).subscribe((res:any) => {
      res.response.order.forEach((element:any) => {
        this.allOrderList.push(element);
      })
    }, err => {
    })
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    let startDateTimeStamp = new Date(dateRangeStart.value).getTime();
    let endDateTimeStamp = new Date(dateRangeEnd.value).getTime();
    console.log(startDateTimeStamp);
    console.log(endDateTimeStamp);

    this.api.getAllOrders({
      params: {
      start_date: startDateTimeStamp,
      end_date: endDateTimeStamp,
      },
      // params: {
      //   limit: 2,
      //   page: 1,
      // },
    }).subscribe((res:any) => {
      this.allOrderList = []
      res.response.order.forEach((element:any) => {
        this.allOrderList.push(element);
      })
    }, err => {
    })
  }
}
