import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectSubmissionListState = (state: AppState)=> state.form
export const selectLanguageState = (state:AppState) => state.language


export const selectSubmissionList = createSelector(
    selectSubmissionListState,
    (state)=>state.list
)

export const selectLanguage = createSelector(
    selectLanguageState,
    (state)=>state
)