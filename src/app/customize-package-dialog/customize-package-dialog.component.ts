import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  applianceList: any[] = [{display : "TV" , guid : "4c7efa58-a80b-4d43-3901-08da50794a19"}, 
                          {display : "Refrigerator" , guid : "77176850-31c2-4f74-1702-08da5085a527"},
                          {display : "Vaccum Cleaner" , guid : "c4805cee-5304-466b-1fd3-08da4f035dd0"},
                          {display : "Washer" , guid : "3433f09b-e255-46ae-3902-08da50794a19"},
                          {display : "Hairdryer" , guid : "46220106-b790-4ec2-3900-08da50794a19"}
                          ]; 
  brandList : String[] = ["Any","BISSELL" , "DYSON" , "DREAME" , "LG" , "PHILIPS" , "MIDEA" ,"MONSTER",
                          "FG" , "BEKO" , "TCL","GINA" , "MAGIC" , "REMINGTON"];
  


  constructor( private formBuilder: FormBuilder,
               private api : ApiService,
               private dialogRef : MatDialogRef<CustomizePackageDialogComponent>,
               public router : Router) { }

  ngOnInit(): void {

    this.customizedPackageForm = this.formBuilder.group({
      houseSpace : ['' , Validators.required],
      familyMembers : [1 , Validators.required],
      brand : ['', ],
      budget : [ 5000 , Validators.required],
      requiredItems  : ['' , Validators.required]
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

    // Loader 

    this.customizedPackageForm.value.houseSpace = Number(this.customizedPackageForm.value.houseSpace);
    this.customizedPackageForm.value.budget = Number(this.customizedPackageForm.value.budget);
    this.customizedPackageForm.value.familyMembers = Number(this.customizedPackageForm.value.familyMembers);

    console.log(this.customizedPackageForm.value);

    //Post API   // display result 
    this.api.customizeMyPackage(this.customizedPackageForm.value).subscribe(res=>   this.router.navigate(['customizePackagePage'], {state: {data : res}}));

  
    //close Dialog
    this.dialogRef.close();

  }

}
