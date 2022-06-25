import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {IsLoadingService} from "@service-work/is-loading";
import {timeout} from "rxjs";

@Component({
  selector: 'app-maintaince-page',
  templateUrl: './maintaince-page.component.html',
  styleUrls: ['./maintaince-page.component.css']
})
export class MaintaincePageComponent implements OnInit {

  public maintenanceList : any ;

  constructor(private http: HttpClient ,
              private api : ApiService,private isLoadingService: IsLoadingService) { }

  ngOnInit(): void {
    this.isLoadingService.add();
    this.api.getMaintenanceList()
      .subscribe(
        {
          next: (res) => {
      setTimeout(()=>{ this.maintenanceList = res ;
        this.isLoadingService.remove();},1000);

          },
          error: () => {
            this.isLoadingService.remove();
          }
        }
      )
  }



}
