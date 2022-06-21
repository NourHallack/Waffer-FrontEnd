import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.css']
})
export class AddNewProductDialogComponent implements OnInit {

  addNewProductForm !: FormGroup ;

  subCategoryList : any = [];
  public categoryList : any ;
  featureOfCategory : any = [];

  constructor(private api : ApiService,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.api.getCategoryList().subscribe( res => { this.categoryList = res ; }  );
    console.log(this.categoryList);

    
  }

  
  
  addNewProduct(){
    

  }
}
