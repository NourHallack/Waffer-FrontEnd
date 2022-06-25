import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import {IsLoadingService} from "@service-work/is-loading";

@Component({
  selector: 'app-seller-pending-requests',
  templateUrl: './seller-pending-requests.component.html',
  styleUrls: ['./seller-pending-requests.component.css']
})
export class SellerPendingRequestsComponent implements OnInit {

  pendingSellerList: any = [];

  constructor(private dialog: MatDialog,
              private api: ApiService,
              private dialogRef: MatDialogRef<SellerPendingRequestsComponent>, private isLoadingService: IsLoadingService) {
    this.isLoadingService.add();

    this.api.getNewSellerPendingRequests().subscribe({
      next: res => {
        this.pendingSellerList = res;
        this.isLoadingService.remove();
      }, error: () => {
        alert("Seller declined failed")
        this.isLoadingService.remove();
      }
    });
    console.log(this.pendingSellerList);

  }

  ngOnInit(): void {
  }

  acceptSeller(id: any) {
    this.isLoadingService.add();

    this.api.acceptNewSeller(id).subscribe({
      next: res => {
        alert("Seller has been accepted");

        this.isLoadingService.remove();
      }, error: () => {
        alert("Seller acceptance failed")
        this.isLoadingService.remove();
      }
    });
    this.dialogRef.close();
  }

  declineSeller(id: any) {
    this.isLoadingService.add();
    this.api.declineNewSeller(id).subscribe({
      next: res => {
        alert("Seller has been declined")
        this.isLoadingService.remove();
      }, error: () => {
        alert("Seller declined failed")

        this.isLoadingService.remove();
      }
    });
    this.dialogRef.close();
  }

}
