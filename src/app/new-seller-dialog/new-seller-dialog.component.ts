import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {IsLoadingService} from "@service-work/is-loading";

@Component({
  selector: 'app-new-seller-dialog',
  templateUrl: './new-seller-dialog.component.html',
  styleUrls: ['./new-seller-dialog.component.css']
})
export class NewSellerDialogComponent implements OnInit {

  displayRules: boolean  = true ;
  Email = new FormControl('', [Validators.required, Validators.email]);

  newSellerForm !: FormGroup ;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private dialogRef: MatDialogRef<NewSellerDialogComponent>, private isLoadingService: IsLoadingService) {
  }

  ngOnInit(): void {

    this.newSellerForm = this.formBuilder.group({
      name : ['' , Validators.required],
      email : ['' , Validators.required],
      contactPhoneNumber  : ['' , Validators.required],
      customerServicePhoneNumber : ['' , ''],
      hasStore : ['' , Validators.required],
      address : ['' , Validators.required],
      description : ['' , Validators.required]
    })
  }

  presentForm() {
    this.displayRules = false ;
  }

  getErrorMessage() {
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.Email.hasError('Email') ? 'Not a valid email' : '';
  }

  sendRegisterSellerRequest(){

    this.newSellerForm.value.hasStore= this.newSellerForm.value.hasStore == 'true' ? true : false ;

    if(this.newSellerForm.valid) {
      this.isLoadingService.add();

      this.api.postRegisterNewSeller(this.newSellerForm.value, "1234")
        .subscribe(
          {
            next: (res) => {
              this.isLoadingService.remove();

              this.newSellerForm.reset();
              this.dialogRef.close();

            },
            error:() => {
              this.isLoadingService.remove();

              alert("Error while sending New Seller Register Request")
            }
        }
      )
    }
    console.log(this.newSellerForm.value);

  }

  hasPhysicalStore(){
    return (this.newSellerForm.value.hasStore.toLowerCase() === 'true'); ;
  }


}
