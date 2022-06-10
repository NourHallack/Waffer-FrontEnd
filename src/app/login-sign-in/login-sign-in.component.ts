import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';


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
  SignUpForm!: FormGroup ;

  reEnterPassword = new FormControl('', [Validators.required]);

  reEnterPasswordCheck:boolean = false ;


  constructor(private formBuilder: FormBuilder,
              private api : ApiService,
              private dialogRef : MatDialogRef<LoginSignInComponent>) { }

  ngOnInit(): void {

    this.SignInForm = this.formBuilder.group({
      userEmail : ['' , Validators.required],
      userPassword : ['' , Validators.required]      
    });

    this.SignUpForm = this.formBuilder.group({
      userName : ['' , Validators.required],
      userEmail : ['' , Validators.required],
      userPassword : ['' , Validators.required]      
    });
  }


  // SignUp Button
  signUp(){

    //check if password equals the Re entered Password
   
    


  }

  //check if password equals the Re entered Password
  getReEnterPasswordCheck(){
    if(this.SignUpForm.value.userPassword != this.reEnterPassword.value){
      return 'The Re-Entered password is different' ;
    }
   
    return '' ;
  }




  // SignIn Button
  signIn(){

  } 

  // Remember Me Checkbox

}
