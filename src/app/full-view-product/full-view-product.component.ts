import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-full-view-product',
  templateUrl: './full-view-product.component.html',
  styleUrls: ['./full-view-product.component.css']
})
export class FullViewProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public product: any) { }

  ngOnInit(): void {
    console.log(this.product);
  }

}
