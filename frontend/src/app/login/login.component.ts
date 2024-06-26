import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastContainerDirective, ToastrModule, ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { switchLanguage } from '../states/submission/submission.action';


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

  constructor(private router: Router, private toaster:ToastrService, private translate: TranslateService, private store: Store<AppState>){}

  switchLanguage(language: string) {
    this.store.dispatch(switchLanguage({lang:language}))
  }
  
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl("", [Validators.required, Validators.minLength(8)] );

  matcher = new MyErrorStateMatcher();


  onSubmit(){
    if(this.emailFormControl.invalid || this.passwordFormControl.invalid){
      console.log("Invalid!!");
      this.toaster.error("Invalid")
      // this.emailFormControl.setValue("")
      // this.passwordFormControl.setValue("")
    }

    else{
      console.log(this.emailFormControl.value);
      console.log(this.passwordFormControl.value);

      if(this.emailFormControl.value === "test@gmail.com" && this.passwordFormControl.value==="password"){
        this.router.navigate(["/home"]);
        
      }

      else{
        this.toaster.error("Invalid Credentials!")
      }
    }



}
}
