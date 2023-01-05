import actionNames from "../../actions/actionNames";

export const summaryDatasets = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_SUMMARY_DATASETS:
            return action.payload;
        default:
            return state;
    }
};

export const clinicalDatasets = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_CLINICAL_DATASETS:
            return action.payload;
        default:
            return state;
    }
};