import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-maintaince-page',
  templateUrl: './maintaince-page.component.html',
  styleUrls: ['./maintaince-page.component.css']
})
export class MaintaincePageComponent implements OnInit {

  public maintenanceList : any ;

  constructor(private http: HttpClient ,
              private api : ApiService) { }

  ngOnInit(): void {

    this.api.getMaintenanceList()
    .subscribe( res =>  { this.maintenanceList = res ; } );
  }



}
