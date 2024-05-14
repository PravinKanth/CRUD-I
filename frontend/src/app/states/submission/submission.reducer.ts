import { createReducer, on } from "@ngrx/store";
import { submitFormData, submitFormDataFailure, submitFormDataSuccess, switchLanguage } from "./submission.action";

export interface submissionList{
    list:any[]
}

export const initialSubmissionList:submissionList={
    list:[]
}

export const initialLanguage:string = "en"

export const submissionListReducer = createReducer(
    initialSubmissionList,
    on(submitFormDataSuccess, (state, {list})=>{
        console.log(list)
        return{
        list:[...list]
        }
    })
);

export const languageReducer = createReducer(
    initialLanguage,
    on(switchLanguage,(state, {lang})=> lang
    )
)

