import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderNavBarComponent } from '../header-nav-bar/header-nav-bar.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FullViewProductComponent } from '../full-view-product/full-view-product.component';
import { SellerFullViewComponent } from '../seller-full-view/seller-full-view.component';
import { ApiService } from '../services/api.service';
import {async} from "rxjs";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() product: any;

  public seller : any ;

  public compareProductList: any;
  public compareMsg: String = "";
  public favoriteMsg: String = "";

  constructor(private cookie: CookieService,
              private dialog: MatDialog,
              private header: HeaderNavBarComponent,
              private api : ApiService,
              private _snackBar: MatSnackBar) {

     }

  ngOnInit(): void {
    this.api.getSellerDetails(this.product.sellerId).subscribe(res => { this.seller = res});

  }


  //Reserve Button

  //Favorite Button
  addProductToFavoriteList() {

    var cookiesFavoriteProductIdList: string = " ";
    cookiesFavoriteProductIdList = this.cookie.get('favoriteProductIdList');

    //Already Exist return Exist
    if (cookiesFavoriteProductIdList.includes(this.product.id)) {
      this.favoriteMsg = "This Product is already added to Favorite List";
      return;
    }

    if (cookiesFavoriteProductIdList != "") {
      cookiesFavoriteProductIdList = cookiesFavoriteProductIdList + "/" + (this.product.id);
      this.cookie.set('favoriteProductIdList', cookiesFavoriteProductIdList);
    }
    else {
      cookiesFavoriteProductIdList = (this.product.id);
      this.cookie.set('favoriteProductIdList', cookiesFavoriteProductIdList);
    }

  }

  //Compare Button

  addProductToCompareList() { // add Product id to cookies

    var cookiesCompareProductIdList: string = " ";
    cookiesCompareProductIdList = this.cookie.get('compareProductIdList');

    //Already Exist return Exist
    if (cookiesCompareProductIdList.includes(this.product.id)) {
      this.compareMsg = "This Product is already added";
      this.openSnackBar(String(this.compareMsg));
      return;
    }

    //Cannot Add more than 3 product (x/x)
    if (cookiesCompareProductIdList.includes("/")) {
      this.compareMsg = "You can compare up to 2 products Only";
      this.openSnackBar(String(this.compareMsg));

      return;
    }

    //Add Same type only
    if (this.cookie.check('subCategoryId') && this.cookie.get('subCategoryId') != this.product.subCategoryId) {
      this.compareMsg = "You can compare of the same type Only";
      this.openSnackBar(String(this.compareMsg));

      return;
    }



    if (cookiesCompareProductIdList != "") {
      this.header.compareProductListLength = "2";
      cookiesCompareProductIdList = cookiesCompareProductIdList + "/" + (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);
    } else {
      cookiesCompareProductIdList = (this.product.id);
      this.cookie.set('compareProductIdList', cookiesCompareProductIdList);
      this.cookie.set('subCategoryId', this.product.subCategoryId);
    }

    this.compareMsg = "Your product was added successfully";
    this.openSnackBar(String(this.compareMsg));

  }


  /// 1 -  new Price = (oldPrice - ratio* oldPrice)
  getNewPrice(price: any, saleRatio: any) {

    return Math.round(price - (saleRatio * price) / 100);

  }
  //  2-  product Manufacture
  getBrandImage(brand: any) {
    return "../../assets/imgs/brand/" + brand + ".png";
  }

  getSellerImage(sellerId : any ) {

    switch(sellerId){
      case "bf0f7f5b-2085-450a-db30-08da51415612" : {
        return "../../assets/imgs/seller/sbitany.png";  
      }
      case "eedb91d4-0621-4db1-afb0-08da55c7d776": {
        return "../../assets/imgs/seller/sm.png";
      }
      case "dfd18b98-8b8b-49f6-afb1-08da55c7d776": {
        return "../../assets/imgs/seller/sg.PNG";
      }
      case "35109f66-0130-4202-afb2-08da55c7d776": {
        return "../../assets/imgs/seller/maslamani.png";
      }
      case "50068c0f-7b00-4325-afb3-08da55c7d776": {
        return "../../assets/imgs/seller/plaza.png";
      }


      default: { 
        return "../../assets/imgs/seller/sbitany.png";
        
     }  

    }
    
  }

  getCompareMsg() {
    return this.compareMsg;
  }

  openSnackBar(message: string) {
    let config = new  MatSnackBarConfig ();
    config.duration = 5000;
    this._snackBar.open(message , undefined , config);
  }

  openFullView() {
    this.dialog.open(FullViewProductComponent, {
      width: '800px',
      height: '500px',
      data: {
        product: this.product
      }
    });
  }

  openSellerView() {


      this.dialog.open(SellerFullViewComponent,{
        width:'750px',
        height:'500px',
        data:{
          seller : this.seller
        }
      })
  }

  isProductInFavList(){

    var cookiesFavoriteProductIdList: string = " ";
    cookiesFavoriteProductIdList = this.cookie.get('favoriteProductIdList');

    //Already Exist return Exist
    if (cookiesFavoriteProductIdList.includes(this.product.id)) {
      return true;
    }
    return false ;

  }

}
