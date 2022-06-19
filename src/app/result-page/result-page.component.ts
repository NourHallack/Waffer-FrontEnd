import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  public productList : any ;

  constructor(private http: HttpClient ,
              private api : ApiService) { }

  ngOnInit(): void {

    this.api.getProductList()
    .subscribe( res =>  { this.productList = res ; } );
  }


}
