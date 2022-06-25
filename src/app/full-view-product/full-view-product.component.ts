import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-full-view-product',
  templateUrl: './full-view-product.component.html',
  styleUrls: ['./full-view-product.component.css']
})
export class FullViewProductComponent implements OnInit {

  specialFeatureList: any = [];
  basicFeatureList: any = ["dimensions" , "weight" , "warranty"];


  constructor(@Inject(MAT_DIALOG_DATA) public product: any,
              private api : ApiService) { 

    var subCategoryId = this.product.product.subCategoryId ;
    this.api.getFeatureBySubCategoryId(subCategoryId).subscribe({
      next: res => {
        this.specialFeatureList = res;
      }, error: () => {
      }
    });
  }

  ngOnInit(): void {
    console.log(this.product);
  }

   /// 1 -  new Price = (oldPrice - ratio* oldPrice)
   getNewPrice(price: any, saleRatio: any) {

    return Math.round(price - (saleRatio * price) / 100);

  }
  //  2-  product Manufacture
  getBrandImage(brand: any) {
    return "../../assets/imgs/brand/" + brand + ".png";
  }

  getFeatureValue(feature: String) {
    let map = new Map<string, string>()
    for (var value in this.product.product) {
      map.set(value, this.product.product[value])
    }
    return (map.get(feature.toString()));;

  }

}
