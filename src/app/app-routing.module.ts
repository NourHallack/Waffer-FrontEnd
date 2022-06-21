import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CompareProductPageComponent } from './compare-product-page/compare-product-page.component';
import { MaintaincePageComponent } from './maintaince-page/maintaince-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { WafferComponent } from './waffer/waffer.component';

const routes: Routes = [
  {path:'' , component : WafferComponent},
  {path:'admin' , component : AdminPageComponent },
  {path:'seller' , component : SellerPageComponent },
  {path:'maintence', component: MaintaincePageComponent},
  {path:'comparePage', component: CompareProductPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
