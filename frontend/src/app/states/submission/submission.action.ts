import { createAction, props } from "@ngrx/store";
import { myFormData } from "../../dialog-overview/dialog-overview.component";

export const submitFormData = createAction(
    "[SubmitForm] Submit form Data",
    props<{formData: myFormData}>()
);

export const submitFormDataSuccess = createAction('[Form] Submit Form Data Success');

export const submitFormDataFailure = createAction('[Form] Submit Form Data Failure', props<{ error: any }>());