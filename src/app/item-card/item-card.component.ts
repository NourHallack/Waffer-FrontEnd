import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderNavBarComponent } from '../header-nav-bar/header-nav-bar.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() product: any;

  public compareProductList: any;

  constructor(private cookie: CookieService,
              private header : HeaderNavBarComponent) { }

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

    //Cannot Add more than 3 product (x/x) 
    if(cookiesCompareProductIdList.includes("/")){
      return ;
    }

    //Already Exist return Exist
    if(cookiesCompareProductIdList.includes(this.product.id)){
      return ;
    }

    if (cookiesCompareProductIdList != ""){  
      this.header.compareProductListLength = "2";
      cookiesCompareProductIdList =  cookiesCompareProductIdList + "/" +  (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);
    }else {
      cookiesCompareProductIdList = (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);
      this.cookie.set('subCategoryId', this.product.subCategoryId);
    }
  
  }


  /// 1 -  new Price = (oldPrice - ratio* oldPrice)
  getNewPrice(price:any , saleRatio : any ){

    return (price - (saleRatio * price)/100);

  }
  //  2-  product Manufacture 
  getBrandImage(brand : any ){
     return "../../assets/imgs/brand/"+ brand+".png" ;
  }

}
