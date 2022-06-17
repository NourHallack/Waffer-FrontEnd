import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() product: any;

  public compareProductList: any;

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }

  // Handle Manufacture Image 

  // Handle Seller Image 

  //Reserve Button

  //Favorite Button

  //Compare Button
  
  addProductToCompareList() { // add Product id to cookies

    var cookiesCompareProductIdList : string = " " ;
    cookiesCompareProductIdList =  this.cookie.get('compareProductIdList');

    //Cannot Add more than 3 product (x-x-x)
    if(cookiesCompareProductIdList.length == 5){
      return ;
    }

    //Already Exist return Exist  ?????
    if(cookiesCompareProductIdList.includes(this.product.id)){
      return ;
    }

    if (cookiesCompareProductIdList != ""){  
      cookiesCompareProductIdList =  cookiesCompareProductIdList + "-" +  (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);
    }else {
      cookiesCompareProductIdList = (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);

    }
  
  }

  //Handle not more than 3 products

}
