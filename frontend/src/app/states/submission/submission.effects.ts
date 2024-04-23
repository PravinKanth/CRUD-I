import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormDataService } from "../../service/form-data.service";
import * as FormActions from '../submission/submission.action';

@Injectable()
export class FormEffects{
    constructor(
        private actions$: Actions,
        private formService: FormDataService
      ) {}

    submitFormData = createEffect(() => this.actions$.pipe(
        ofType(FormActions.submitFormData),
        exhaustMap(({ formData }) => {
            const formDataObject = new FormData();
            formDataObject.append('id', formData.id);
            formDataObject.append('name', formData.name);
            formDataObject.append('department', formData.department);
            formDataObject.append('address', formData.address);
            formDataObject.append('city', formData.city);
            formDataObject.append('state', formData.state);
            // console.log("dei")
            return this.formService.submitFormData(formDataObject).pipe( 
                    map((data) => { 
                        // console.log("hi");
                        return(
                             FormActions.submitFormDataSuccess({list:data}))}
                            ),
                    catchError(error => {
                        // console.log("bye")
                        return(of(FormActions.submitFormDataFailure({ error })))
                })
                );
        })
    ));

    getFormData = createEffect(()=>this.actions$.pipe(
        ofType(FormActions.getFormData),
        exhaustMap(()=>{
            return this.formService.getFormData().pipe(
                map((data)=>{
                    return(
                        FormActions.submitFormDataSuccess({list:data})
                    );
                }),
                catchError((error)=>{
                    return(of(FormActions.submitFormDataFailure({error})));
                })
            )
        })
    ))

    deleteFormData = createEffect(()=>this.actions$.pipe(
        ofType(FormActions.deleteFormData),
        exhaustMap(({deleteData})=>{
            return(
                this.formService.postDelete(deleteData).pipe(
                    map((data)=>{
                        return(
                            FormActions.submitFormDataSuccess({list:data})
                        );
                    }),
                    catchError((error)=>{
                        return(
                            of(FormActions.submitFormDataFailure({error}))
                        );
                    })
                )
            );
        })
    ))


}