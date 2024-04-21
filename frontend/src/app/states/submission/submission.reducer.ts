import { createReducer, on } from "@ngrx/store";
import { submitFormData, submitFormDataFailure, submitFormDataSuccess } from "./submission.action";

export interface submissionList{
    list:any[]
}

export const initialSubmissionList:submissionList={
    list:[]
}

export const submissionListReducer = createReducer(
    initialSubmissionList,
    on(submitFormDataSuccess, (state, {list})=>{
        console.log(list)
        return{
        list:[...list]
        }
        

    })
);

