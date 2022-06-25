import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {IsLoadingService} from "@service-work/is-loading";

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  public productList : any ;

  constructor(private http: HttpClient ,
              private api : ApiService, private isLoadingService: IsLoadingService) { }

  ngOnInit(): void {

    this.isLoadingService.add();
    this.api.getProductList()
      .subscribe(
        {
          next: (res) => {
            this.productList = res;
            this.isLoadingService.remove();
          },
          error: () => {
            this.isLoadingService.remove();
          }
        }
      )
  }

  getProducts(productsList : any ){
    this.productList = productsList ;
  }


}
