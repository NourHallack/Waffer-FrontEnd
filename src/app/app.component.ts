import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {filter, Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import { IsLoadingService } from '@service-work/is-loading';
import {ResultPageComponent} from "./result-page/result-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  resultComponent!: ResultPageComponent;

  public  IsLoading: Observable<boolean> | undefined;
  constructor( private translateService : TranslateService,private isLoadingService: IsLoadingService, private router: Router){
    this.translateService.setDefaultLang('English');
    this.translateService.use(localStorage.getItem('lang') || 'English') ;
    document.dir = localStorage.getItem('lang') == 'English' ? "ltr" : "rtl" ;

  }

  ngOnInit(): void {
    this.IsLoading = this.isLoadingService.isLoading$();

  }

  getSubCategoryProducts(prodcuts: any): void{this.resultComponent.getProducts(prodcuts);}

}
