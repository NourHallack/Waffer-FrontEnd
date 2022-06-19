import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //json-server --watch db.json

  //Authorization
  // const headers = new Headers({
  //   'Authorization': `Bearer ${auth_token}`
  // })

  // let headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'test1' });
  // let options = { headers: headers };


  baseURL : String = "http://nazeehrimawi-001-site1.dtempurl.com/";
 
  constructor(private http : HttpClient) { }

  postRegisterNewSeller(data : any , auth_token : any){   // Client Side + No authorization
    return this.http.post(this.baseURL+"api/sellers" , data );
  }

  getRegisterNewSeller(data : any){   // Admin Side 
    return this.http.get<any>("http://localhost:3000/sellerRegisterRequest/");
  }

  postNewProduct(data : any){   // Seller Side 
    return this.http.post<any>("http://localhost:3000/productList", data );
  }

  getProductList(){   // Client Side 
    return this.http.get<any>(this.baseURL +"api/items");

  }

  getProductById(productId : any ){
    return this.http.get<any>(this.baseURL +`api/items/${productId}`);
  }

  getFeatureBySubCategoryId (subCategoryId : any){
    return this.http.get<any>(this.baseURL +`api/subcategories/get-features/${subCategoryId}`);
  }

  getCompareList(){
    return this.http.get<any>("http://localhost:3000/compareProductList");
  }

  getMaintenanceList(){
    return this.http.get<any>("http://localhost:3000/maintenanceList");
  }

  




}
