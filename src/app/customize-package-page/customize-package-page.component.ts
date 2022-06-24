import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customize-package-page',
  templateUrl: './customize-package-page.component.html',
  styleUrls: ['./customize-package-page.component.css']
})
export class CustomizePackagePageComponent implements OnInit {

  productList: any;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.productList = history.state.data;
    console.log(this.productList);
  }

  getNewPrice(price: any, saleRatio: any) {

    return Math.round(price - (saleRatio * price) / 100);

  }

  //Calculate Total Package Price 
  calculateTotalPackagePrice() {
    let sum = 0;

    this.productList.forEach((element: any) => {
      sum += this.getNewPrice(element.price, element.saleRatio)
    });

    return sum ;

  }

}
