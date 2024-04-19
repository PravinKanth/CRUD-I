import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty ||  isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(private router: Router){}
  
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl("", [Validators.required, Validators.minLength(8)] );

  matcher = new MyErrorStateMatcher();


  onSubmit(){
    if(this.emailFormControl.invalid || this.passwordFormControl.invalid){
      console.log("Invalid!!");

    }

    else{
      console.log(this.emailFormControl.value);
      console.log(this.passwordFormControl.value);

      if(this.emailFormControl.value === "test@gmail.com" && this.passwordFormControl.value==="password"){
        this.router.navigate(["/home"]);
        
      }
    }



}
}
