import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,

} from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitFormData } from '../states/submission/submission.action';
import { AppState } from '../states/app.state';


@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.scss'
})



export class DialogOverviewComponent {
  constructor(
    private toaster : ToastrService,
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<AppState>
  
  ) {}

  formData: myFormData = {
    id: '',
    name: '',
    department: '',
    address: '',
    city: '',
    state: ''
  }

  idFormControl = new FormControl("", [Validators.required]);
  nameFormControl = new FormControl("", [Validators.required])
  departmentFormControl = new FormControl("", [Validators.required])
  addressFormControl = new FormControl("", [Validators.required])
  cityFormControl = new FormControl("", [Validators.required])
  stateFormControl = new FormControl("", [Validators.required])

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit(){
    if(this.idFormControl.invalid || this.nameFormControl.invalid || this.departmentFormControl.invalid || this.addressFormControl.invalid || this.cityFormControl.invalid || this.stateFormControl.invalid){
    this.toaster.error("Fill out all the fields!!");
      console.log("Error!")
    }

    else{
      
      this.formData.id=this.idFormControl.value!;
      this.formData.name = this.nameFormControl.value!;
      this.formData.department = this.departmentFormControl.value!;
      this.formData.address = this.addressFormControl.value!;
      this.formData.city = this.cityFormControl.value!;
      this.formData.state = this.stateFormControl.value!;

      this.store.dispatch(submitFormData({formData:this.formData}))
      console.log(this.formData);

      // this.formData.id="";
      // this.formData.name = "";
      // this.formData.department = "";
      // this.formData.address = "";
      // this.formData.city = "";
      // this.formData.state = "";

      this.dialogRef.close("submit");
    }
  }

}

export interface myFormData{
  id:string;
  name:string;
  department:string;
  address:string;
  city:string;
  state:string;
}