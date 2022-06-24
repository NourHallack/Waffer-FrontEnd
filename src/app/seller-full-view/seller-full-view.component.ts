import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-seller-full-view',
  templateUrl: './seller-full-view.component.html',
  styleUrls: ['./seller-full-view.component.css']
})
export class SellerFullViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public seller: any) { }

  ngOnInit(): void {
    console.log(this.seller.seller);
  }

}
