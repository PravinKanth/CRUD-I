import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormDataService } from "../../service/form-data.service";
import * as FormActions from '../submission/submission.action';

@Injectable()
export class FormEffects{
    submitFormData$ = createEffect(() => this.actions$.pipe(
        ofType(FormActions.submitFormData),
        mergeMap(({ formData }) => {
            const formDataObject = new FormData();
            // Append form data fields to FormData object
            formDataObject.append('id', formData.id);
            formDataObject.append('name', formData.name);
            formDataObject.append('department', formData.department);
            formDataObject.append('address', formData.address);
            formDataObject.append('city', formData.city);
            formDataObject.append('state', formData.state);
            console.log("hi");
            console.log(formDataObject);
            formDataObject.forEach((value, key) => {
                console.log(key, value);
            });
            return this.formService.submitFormData(formDataObject)
                .pipe(
                    map(() => FormActions.submitFormDataSuccess()),
                    catchError(error => of(FormActions.submitFormDataFailure({ error })))
                );
        })
    ));

      constructor(
        private actions$: Actions,
        private formService: FormDataService
      ) {}
}