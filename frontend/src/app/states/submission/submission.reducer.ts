import { createReducer, on } from "@ngrx/store";
import { submitFormData, submitFormDataFailure, submitFormDataSuccess } from "./submission.action";

export interface formState{
    loading:boolean;
    error:any;  
}

export const initialState : formState={
    loading:false,
    error:null
}

export const formReducer = createReducer(
    initialState,
    on(submitFormData, (state)=>({
        ...state,
        loading:true,
        error:null
    })),
    on(submitFormDataSuccess, (state) => ({ ...state, loading: false })),
    on(submitFormDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);