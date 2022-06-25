import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultPageComponent } from '../result-page/result-page.component';

@Component({
  selector: 'app-waffer',
  templateUrl: './waffer.component.html',
  styleUrls: ['./waffer.component.css']
})
export class WafferComponent implements OnInit {

  @ViewChild('productOfSubCategoryList')
  resultComponent!: ResultPageComponent;

  constructor() { }

  ngOnInit(): void {
  }


  searchProduct(prodcuts: any): void{this.resultComponent.getProducts(prodcuts);}



}
