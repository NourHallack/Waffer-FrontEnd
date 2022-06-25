import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {CustomizePackageDialogComponent} from '../customize-package-dialog/customize-package-dialog.component';
import {LoginSignInComponent} from '../login-sign-in/login-sign-in.component';
import {NewSellerDialogComponent} from '../new-seller-dialog/new-seller-dialog.component';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';
import {IsLoadingService} from "@service-work/is-loading";


@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavBarComponent implements OnInit {

  @Output() selectedPlanEvent = new EventEmitter<string>();

  languages: string[] = ['Arabic', 'English'];
  selectedLanguage: String;

  compareProductListLength: String = "";

  compareProductList: any = [];
  favoriteProductList: any = [];

  public categoryList: any;
  public subCategoryList: any;

  constructor(private dialog: MatDialog,
              private api: ApiService,
              private cookie: CookieService, private isLoadingService: IsLoadingService,
              private router: Router) {

    this.selectedLanguage = localStorage.getItem('lang') || "English";

    this.getCompareList();
    this.getFavoriteList();

    this.compareProductListLength = this.cookie.get('compareProductIdList').includes("/") ? "2" :
      this.cookie.get('compareProductIdList') != "" ? "1" : "";
    this.isLoadingService.add();
    this.api.getCategoryList().subscribe({
      next: res => {
        this.categoryList = res;
        this.isLoadingService.remove();
      }, error: () => {
        this.isLoadingService.remove();

      }
    });
  }

  ngOnInit(): void {
    this.displayLoginRegisterButton();
  }

  //Handle Changing the Languages
  changeLanguage (lang : string){
    localStorage.setItem('lang' , lang );
    window.location.reload();
  }

  //Register new Seller
  openNewSellerDialog() {
    this.dialog.open(NewSellerDialogComponent, {
      width : '40%'
    });
  }

  //Login Page
  openLoginSignInDialog() {
    this.dialog.open(LoginSignInComponent, {
      width : '30%'
    });
  }

  //Customized Package
  openCustomizedPackageDialog(){
    this.dialog.open(CustomizePackageDialogComponent, {
      width : '40%',
      autoFocus: false
    });

  }

  //Compare list
  getCompareList() {
    //Get the Id of Compare prodcut list from cookies
    var cookiesCompareProductIdList : string = this.cookie.get('compareProductIdList');
    if(cookiesCompareProductIdList == ""){
      return;
    }
    let CompareProductIdList = cookiesCompareProductIdList.split("/");

    //Get from Api Product of the Ids and add them to Compare product list
    this.compareProductList = [];
    for (let i = 0; i < CompareProductIdList.length; i++) {
      this.isLoadingService.add();
      this.api.getProductById(CompareProductIdList[i]).subscribe({
        next: res => {
          this.compareProductList.push(res);
          this.isLoadingService.remove();
        }, error: () => {
          this.isLoadingService.remove();
        }
      });

    }
  }

  deleteProductFromCompareList(productId: any ) {

    //Get the Id of Compare prodcut list from cookies
    var cookiesCompareProductIdList : string = this.cookie.get('compareProductIdList');
    let CompareProductIdList = cookiesCompareProductIdList.split("/");

    if(CompareProductIdList.length == 1 ){
      this.cookie.delete('compareProductIdList');
      this.cookie.delete('subCategoryId');
      this.compareProductListLength = "" ;
      this.compareProductList = [];

    }else if(CompareProductIdList[0] == productId){
      this.cookie.set('compareProductIdList' , CompareProductIdList[1]);
      this.compareProductListLength = "1";
    }else {
      this.cookie.set('compareProductIdList' , CompareProductIdList[0]);
      this.compareProductListLength = "1";
    }

  }

  getFavoriteList() {

    //Get the Id of Compare prodcut list from cookies
    var cookiesFavoriteProductIdList: string = this.cookie.get('favoriteProductIdList');

    if (cookiesFavoriteProductIdList == "") {
      this.favoriteProductList = [];
      return;
    }
    let FavoriteProductIdList = cookiesFavoriteProductIdList.split("/");

    //Get from Api Product of the Ids and add them to Compare product list
    this.favoriteProductList = [];
    for (let i = 0; i < FavoriteProductIdList.length; i++) {
      this.isLoadingService.add();

      this.api.getProductById(FavoriteProductIdList[i]).subscribe({
        next: res => {
          this.favoriteProductList.push(res);
          this.isLoadingService.remove();
        }, error: () => {
          this.isLoadingService.remove();
        }
      });
    }

  }

  deleteProductFromFavoriteList(id : any ){

     var cookiesFavoriteProductIdList : string = this.cookie.get('favoriteProductIdList');
     let FavoriteProductIdList = cookiesFavoriteProductIdList.replace("/"+id, "").replace(id+"/", "").replace(id,"");

    if (FavoriteProductIdList == "") {
      this.cookie.delete('favoriteProductIdList');
    }

    this.cookie.set('favoriteProductIdList', FavoriteProductIdList);
    this.getFavoriteList();


  }

  getSubCategory(categoryId: any) {
    this.isLoadingService.add();

    this.api.getSubCategoryById(categoryId).subscribe({
      next: res => {
        this.subCategoryList = res;
        this.isLoadingService.remove();
      }, error: () => {
        this.isLoadingService.remove();
      }
    });
    return this.subCategoryList;
  }

  getProductBySubCategoryId(subCategoryId: any) {
    this.isLoadingService.add();

    return this.api.getProductsBySubCategoryId(subCategoryId).subscribe({
      next: res => {
        this.selectedPlanEvent.emit(res);
        this.isLoadingService.remove();
      }, error: () => {
        this.isLoadingService.remove();
      }
    });
  }

  displayLoginRegisterButton(){
    if (this.router.url == "/admin" || this.router.url == "/seller"){
      return false ;
    }else{
      return true ;
    }
  }
}
