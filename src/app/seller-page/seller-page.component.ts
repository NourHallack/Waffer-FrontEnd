import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AddNewProductDialogComponent } from '../add-new-product-dialog/add-new-product-dialog.component';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private api: ApiService, 
              public router: Router) {

   }

  ngOnInit(): void {
  }

  openAddNewProduct(){

    this.dialog.open(AddNewProductDialogComponent, {
      width : '40%',
      autoFocus: false
    });

  }

  backToShopper(){
    this.router.navigate(['']);
  }



}
