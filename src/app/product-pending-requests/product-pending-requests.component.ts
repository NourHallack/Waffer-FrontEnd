import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-pending-requests',
  templateUrl: './product-pending-requests.component.html',
  styleUrls: ['./product-pending-requests.component.css']
})
export class ProductPendingRequestsComponent implements OnInit {


  pendingProductList: any = [];

  constructor(private dialog: MatDialog,
              private api: ApiService,
              private dialogRef : MatDialogRef<ProductPendingRequestsComponent>) {

    this.api.getProductPendingRequests().subscribe(res => { this.pendingProductList = res });
    console.log(this.pendingProductList);

  }

  ngOnInit(): void {
  }

  acceptProduct(id : any){
    this.api.acceptNewProduct(id).subscribe(res => console.log(res));
    this.dialogRef.close();
  }
  
  declineProduct(id : any){
    this.api.declineNewProduct(id).subscribe();
    this.dialogRef.close();
  }
}
