import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectSubmissionListState = (state: AppState)=> state.form


export const selectSubmissionList = createSelector(
    selectSubmissionListState,
    (state)=>state.list
)