import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareProductPageComponent } from './compare-product-page/compare-product-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes: Routes = [
  {path:'maintence', component: SearchBarComponent},
  {path:'comparePage', component: CompareProductPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
