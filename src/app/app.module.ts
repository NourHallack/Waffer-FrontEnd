import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderNavBarComponent } from './header-nav-bar/header-nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { NewSellerDialogComponent } from './new-seller-dialog/new-seller-dialog.component';
import { LoginSignInComponent } from './login-sign-in/login-sign-in.component';
import { CompareProductPageComponent } from './compare-product-page/compare-product-page.component';
import { CustomizePackageDialogComponent } from './customize-package-dialog/customize-package-dialog.component';
import { MaintaincePageComponent } from './maintaince-page/maintaince-page.component';
import { ResultPageComponent } from './result-page/result-page.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavBarComponent,
    SearchBarComponent,
    ItemCardComponent,
    NewSellerDialogComponent,
    LoginSignInComponent,
    CompareProductPageComponent,
    CustomizePackageDialogComponent,
    MaintaincePageComponent,
    ResultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSliderModule,
    MatButtonToggleModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    CookieService,
    HeaderNavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
