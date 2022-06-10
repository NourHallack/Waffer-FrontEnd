import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';


//TO-DO (  Translation - Radio Button "Yes change Hint")

@Component({
  selector: 'app-new-seller-dialog',
  templateUrl: './new-seller-dialog.component.html',
  styleUrls: ['./new-seller-dialog.component.css']
})
export class NewSellerDialogComponent implements OnInit {

  displayRules: boolean  = true ;
  email = new FormControl('', [Validators.required, Validators.email]);

  newSellerForm !: FormGroup ;

  constructor( private formBuilder: FormBuilder,
                private api : ApiService,
                private dialogRef : MatDialogRef<NewSellerDialogComponent>) { }

  ngOnInit(): void {

    this.newSellerForm = this.formBuilder.group({
      companyName : ['' , Validators.required],
      companyEmail : ['' , Validators.required],
      companyPhone : ['' , Validators.required],
      companyCustomerServicePhone: ['' , ''],
      companyHasPhysicalStore : ['' , Validators.required],
      companyLocation : ['' , Validators.required],
      companyOfferedProduct : ['' , Validators.required]
    })
  }

  presentForm() {
    this.displayRules = false ; 
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  sendRegisterSellerRequest(){

    if(this.newSellerForm.valid){
      this.api.postRegisterNewSeller(this.newSellerForm.value)
      .subscribe(
        { next:(res) => {
            alert("New Seller Register Request was sent Successfully");
            this.newSellerForm.reset();
            this.dialogRef.close();
          },
            error:() => {
              alert("Error while sending New Seller Register Request")
          }
        }
      )
    }
    console.log(this.newSellerForm.value);

  }

  hasPhysicalStore(){
    return (this.newSellerForm.value.companyHasPhysicalStore.toLowerCase() === 'true'); ;
  }


}
