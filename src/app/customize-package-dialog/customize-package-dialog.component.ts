import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-customize-package-dialog',
  templateUrl: './customize-package-dialog.component.html',
  styleUrls: ['./customize-package-dialog.component.css']
})
export class CustomizePackageDialogComponent implements OnInit {
  
  // 1- Send Api
  // 2- Open Customize Package Page 
  // 3- Fill table of devices 

  customizedPackageForm !: FormGroup ;
  autoTicks = false;
  showTicks = false;  
  tickInterval = 1;

  applianceList: string[] = ['TV', 'Mobile', 'Refrigerator', 'Vaccum Cleaner', 'Washer', 'Hairdryer'];

  constructor( private formBuilder: FormBuilder,
               private api : ApiService,
               private dialogRef : MatDialogRef<CustomizePackageDialogComponent>) { }

  ngOnInit(): void {

    this.customizedPackageForm = this.formBuilder.group({
      houseSpace : ['' , Validators.required],
      noOfFamilyMember : [1 , Validators.required],
      budget : [ 5000 , Validators.required],
      requiredApplicances  : ['' , Validators.required],
      powerConsumption : ['' , '']
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

 
  generatePackage(){
    this.customizedPackageForm.value.houseSpace = Number(this.customizedPackageForm.value.houseSpace);
    console.log(this.customizedPackageForm.value);

  }

}
