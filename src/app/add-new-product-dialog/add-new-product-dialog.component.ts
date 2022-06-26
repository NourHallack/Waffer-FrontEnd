import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import {IsLoadingService} from "@service-work/is-loading";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.css']
})
export class AddNewProductDialogComponent implements OnInit {

  addNewProductForm !: FormGroup;

  subCategoryList: any = [];
  public categoryList: any;
  featureOfCategory: any = [];
  basicFeatureList: any = [];
  model:any ;

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private cookie: CookieService,
              private dialogRef: MatDialogRef<AddNewProductDialogComponent>, private isLoadingService: IsLoadingService) {

    this.addNewProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      dimensions: ['', Validators.required],
      weight: ['', Validators.required],
      photoLink: ['', Validators.required],
      brand: ['', Validators.required],
      modelNumber: ['', Validators.required],
      warranty: ['', Validators.required],
      description: ['', Validators.required],
      saleRatio: ['0' , ],
      subCategoryId: ['' , Validators.required],
      sellerId: [ this.cookie.get('sellerId'), ], // Get it from Cookies
      sortPriority: ['',]

    })
  }

  ngOnInit(): void {

    this.api.getCategoryList().subscribe(res => { this.categoryList = res; });
    console.log(this.categoryList);


  }

  selectCategory(CategoryId: any) {
    this.api.getSubCategoryById(CategoryId).subscribe(res => this.subCategoryList = res);
  }

  selectSubCategory(subCategoryId: any) {
    this.isLoadingService.add();

    this.api.getFeatureBySubCategoryId(subCategoryId)
      .subscribe({
        next: res => {
          res.forEach((element: any) => {
            this.addNewProductForm.addControl(element.codeName, new FormControl('', Validators.required))
          });
          this.featureOfCategory = res;
          this.isLoadingService.remove();
        }, error: () => {
          this.isLoadingService.remove();
        }
      });

    this.basicFeatureList = ["name", "price", "color", "photoLink", "description", "brand", "saleRatio",
      "dimensions", "weight", "modelNumber", "warranty", "sortPriority"];
  }

  getLabel(feature: String) {
    return "featureName." + feature
  }

  getFeature(feature: String) {
    return "model." + feature
  }



  addNewProduct() {
    this.isLoadingService.add();
    this.api.postNewProduct(this.addNewProductForm.value).subscribe({
      next: res => {
        this.isLoadingService.remove();
      }, error: () => {
        this.isLoadingService.remove();
      }
    });
    this.dialogRef.close();

  }
}
