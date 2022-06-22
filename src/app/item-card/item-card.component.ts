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
  public compareMsg : String = "" ;
  public favoriteMsg : String = "" ;

  constructor(private cookie: CookieService,
              private header : HeaderNavBarComponent) { }

  ngOnInit(): void {
  }
 

  //Reserve Button

  //Favorite Button
  addProductToFavoriteList(){

    var cookiesFavoriteProductIdList : string = " " ;
    cookiesFavoriteProductIdList =  this.cookie.get('favoriteProductIdList');

    //Already Exist return Exist
    if(cookiesFavoriteProductIdList.includes(this.product.id)){
      this.favoriteMsg = "This Product is already added to Favorite List" ;
      return ;
    }

    if (cookiesFavoriteProductIdList != ""){  
      cookiesFavoriteProductIdList =  cookiesFavoriteProductIdList + "/" +  (this.product.id);
      this.cookie.set('favoriteProductIdList', cookiesFavoriteProductIdList);
    }
    else {
      cookiesFavoriteProductIdList = (this.product.id);
      this.cookie.set('favoriteProductIdList', cookiesFavoriteProductIdList);
    }

  }

  //Compare Button
  
  addProductToCompareList() { // add Product id to cookies

    var cookiesCompareProductIdList : string = " " ;
    cookiesCompareProductIdList =  this.cookie.get('compareProductIdList');

    //Already Exist return Exist
    if(cookiesCompareProductIdList.includes(this.product.id)){
      this.compareMsg = "This Product is already added" ;
      return ;
    }

    //Cannot Add more than 3 product (x/x) 
    if(cookiesCompareProductIdList.includes("/")){
      this.compareMsg = "You can compare up to 2 products Only";
      return ;
    }

    //Add Same type only 
    if (this.cookie.check('subCategoryId') && this.cookie.get('subCategoryId') != this.product.subCategoryId){
      this.compareMsg = "You can compare of the same type Only";
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

    this.compareMsg = "Your product was added successfully";
  
  }


  /// 1 -  new Price = (oldPrice - ratio* oldPrice)
  getNewPrice(price:any , saleRatio : any ){

    return Math.round(price - (saleRatio * price)/100);

  }
  //  2-  product Manufacture 
  getBrandImage(brand : any ){
     return "../../assets/imgs/brand/"+ brand+".png" ;
  }

  getCompareMsg(){
    return this.compareMsg;
  }

}
