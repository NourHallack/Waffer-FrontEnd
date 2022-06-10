import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //json-server --watch db.json

  constructor(private http : HttpClient) { }

  postRegisterNewSeller(data : any){   // Client Side 
    return this.http.post<any>("http://localhost:3000/sellerRegisterRequest/", data );
  }

  getRegisterNewSeller(data : any){   // Admin Side 
    return this.http.get<any>("http://localhost:3000/sellerRegisterRequest/");
  }

  postNewProduct(data : any){   // Seller Side 
    return this.http.post<any>("http://localhost:3000/productList", data );
  }

  getProductList(data : any){   // Client Side 
    return this.http.get<any>("http://localhost:3000/productList");
  }

  getCompareList(){
    return this.http.get<any>("http://localhost:3000/compareProductList");
  }




}
