import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductPendingRequestsComponent } from '../product-pending-requests/product-pending-requests.component';
import { SellerPendingRequestsComponent } from '../seller-pending-requests/seller-pending-requests.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private api: ApiService, 
              public router: Router) {

  }

  ngOnInit(): void {
  }

  openPendingProduct(){
    this.dialog.open(ProductPendingRequestsComponent, {
      width : '40%'
    });

  }

  openPendingSeller(){
    this.dialog.open(SellerPendingRequestsComponent, {
      width : '40%'
    });

  }

  backToShopper(){
    this.router.navigate(['']);
  }

}
