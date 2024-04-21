import { ActionReducerMap } from "@ngrx/store";
import {  submissionList, submissionListReducer } from "./submission/submission.reducer";


export interface AppState{
    form:submissionList;
}

// export const reducers: ActionReducerMap<AppState> = {
//     form: submissionListReducer,
//     // Add other reducers here if needed
// };