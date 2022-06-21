import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-seller-pending-requests',
  templateUrl: './seller-pending-requests.component.html',
  styleUrls: ['./seller-pending-requests.component.css']
})
export class SellerPendingRequestsComponent implements OnInit {

  pendingSellerList: any = [];

  constructor(private dialog: MatDialog,
              private api: ApiService,
              private dialogRef : MatDialogRef<SellerPendingRequestsComponent>) {

    this.api.getNewSellerPendingRequests().subscribe(res => { this.pendingSellerList = res });
    console.log(this.pendingSellerList);

  }

  ngOnInit(): void {
  }

  acceptSeller(id : any){
    this.api.acceptNewSeller(id).subscribe();
    this.dialogRef.close();
  }
  
  declineSeller(id : any){
    this.api.declineNewSeller(id).subscribe();
    this.dialogRef.close();
  }

}
