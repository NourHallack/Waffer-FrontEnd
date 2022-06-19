import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CustomizePackageDialogComponent } from '../customize-package-dialog/customize-package-dialog.component';
import { LoginSignInComponent } from '../login-sign-in/login-sign-in.component';
import { NewSellerDialogComponent } from '../new-seller-dialog/new-seller-dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavBarComponent implements OnInit {

  languages: string[] = ['Arabic','English'];
  selectedLanguage : String ;

  compareProductListLength : String = "";

  compareProductList : any = [];
  

  constructor(private http: HttpClient ,
              private dialog : MatDialog,
              private api : ApiService,
              private cookie: CookieService ) { 

    this.selectedLanguage = localStorage.getItem('lang') || "English";
    this.getCompareList ();
    this.compareProductListLength = this.cookie.get('compareProductIdList').includes("/") ? "2" : 
                                    this.cookie.get('compareProductIdList') != "" ? "1" : "" ;
  }

  ngOnInit(): void { 
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
      this.api.getProductById(CompareProductIdList[i]).subscribe( res =>  
      this.compareProductList.push(res));
      
    }
  }

  deleteProductFromCompareList(productId: any ) {

    //Get the Id of Compare prodcut list from cookies
    var cookiesCompareProductIdList : string = this.cookie.get('compareProductIdList');
    let CompareProductIdList = cookiesCompareProductIdList.split("/");

    if(CompareProductIdList.length == 1 ){
      this.cookie.delete('compareProductIdList');
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


  



 

}
