import { createAction, props } from "@ngrx/store";
import { myFormData } from "../../dialog-overview/dialog-overview.component";

export const submitFormData = createAction(
    "[SubmitForm] Submit form Data",
    props<{formData: myFormData}>()
);

export const submitFormDataSuccess = createAction('[Form] Submit Form Data Success',
 props<{list:any}>()
);

export const submitFormDataFailure = createAction('[Form] Submit Form Data Failure',
 props<{ error: any }>()
);

export const getFormData = createAction("[GetForm] Get Form Data")

export const deleteFormData = createAction(
    "[DeleteFormData] Delete Form Data",
    props<{deleteData:string}>());

// Localization bruh

export const switchLanguage = createAction(
    '[switchLanguage] Language Switch',
    props<{lang:string}>()
);

