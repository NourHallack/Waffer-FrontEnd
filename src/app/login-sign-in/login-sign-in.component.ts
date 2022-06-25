import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {IsLoadingService} from "@service-work/is-loading";


/** TO Do
 * 1- Sign In Button
 * 2- Login Button
 * 3- Remember Me checkbox
 * 4- check the password is equal to the re-entered password
 */
@Component({
  selector: 'app-login-sign-in',
  templateUrl: './login-sign-in.component.html',
  styleUrls: ['./login-sign-in.component.css']
})
export class LoginSignInComponent implements OnInit {

  SignInForm !: FormGroup ;
  user : any = "" ;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private dialogRef: MatDialogRef<LoginSignInComponent>,
              public router: Router,
              private cookie: CookieService, private isLoadingService: IsLoadingService) {
  }

  ngOnInit(): void {

    this.SignInForm = this.formBuilder.group({
      email : ['' , Validators.required],
      password: ['', Validators.required]
    });


  }

  // SignIn Button
  signIn() {
    this.isLoadingService.add();

    this.api.login(this.SignInForm.value).subscribe({
      next: res => {

        if (res.roles == "Admin") {
          this.router.navigate(['admin']);
        } else if (res.roles == "User") {
          this.router.navigate(['seller']);
        } else {
          this.router.navigate(['']);
        }

        this.cookie.set('jwt', res.token);
        this.isLoadingService.remove();

      }, error: () => {
        this.isLoadingService.remove();
      }
    });

    this.dialogRef.close();


  }

}
