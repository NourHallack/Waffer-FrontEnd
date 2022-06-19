import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-compare-product-page',
  templateUrl: './compare-product-page.component.html',
  styleUrls: ['./compare-product-page.component.css']
})
export class CompareProductPageComponent implements OnInit {

  specialFeatureList: any = [];
  compareProductList: any = [];
  basicFeatureList: any = ["name" , "description" ,"brand" , "price" , "saleRatio" , "color"];

  constructor(private api: ApiService,
    private cookie: CookieService) { }

  ngOnInit(): void {

    this.getCompareList();
    var subCategoryId = this.cookie.get('subCategoryId');
    this.api.getFeatureBySubCategoryId(subCategoryId).subscribe(
      res => { this.specialFeatureList = res; }
    );

    //"c4805cee-5304-466b-1fd3-08da4f035dd0"
  }


  getCompareList() {

    var cookiesCompareProductIdList: string = this.cookie.get('compareProductIdList');
    let CompareProductIdList = cookiesCompareProductIdList.split("/");

    this.compareProductList = [];
    for (let i = 0; i < CompareProductIdList.length; i++) {
      this.api.getProductById(CompareProductIdList[i]).subscribe(res =>
        this.compareProductList.push(res));
    }
    console.log(this.compareProductList);
    //console.log(this.compareProductList);
   
  }

  getFeatureValue(feature: String, productNo: any) {
    let map = new Map<string, string>()
    for (var value in this.compareProductList[productNo]) {
      map.set(value, this.compareProductList[productNo][value])
    }
    if( (map.get(feature.toString())) == undefined){
      return  " - "
    }

    return (map.get(feature.toString()));;

  }

  getLabel(feature: String) {
    return "featureName." + feature
  }
}
