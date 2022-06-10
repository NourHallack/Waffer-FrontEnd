import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor( private translateService : TranslateService){
    this.translateService.setDefaultLang('English');
    this.translateService.use(localStorage.getItem('lang') || 'English') ;
    document.dir = localStorage.getItem('lang') == 'English' ? "ltr" : "rtl" ;
 
  }
}
