import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../app/services/api.service';

@Component({
  selector: 'app-switch-screens',
  templateUrl: './switch-screens.component.html',
  styleUrls: ['./switch-screens.component.css']
})
export class SwitchScreensComponent implements OnInit {

  public switchScreen: any = [];
  constructor(
    private api:ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.api.getSwitchScreenData().subscribe((res:any)=>{
      this.switchScreen = res.response.result;
     })
    }

    openScrollableContent(updateStatus:any) {
      this.modalService.open(updateStatus, { scrollable: true });
    }

    changeStatus(id:any, status:any) {
      this.api.updateSwitchScreen(id,{"status":status ? false : true}).subscribe((res:any)=> {
        this.api.getSwitchScreenData().subscribe((res:any)=>{
          this.switchScreen = res.response.result;
         })
      })
    }
}
