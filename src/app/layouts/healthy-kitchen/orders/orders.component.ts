import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
})
export class HealthyOrdersComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigate(['healthy-kitchen/add-orders']);
  }
}
