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

export const dataTypeFileCounts = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_DATA_TYPE_COUNTS:
            return action.payload;
        default:
            return state;
    }
}

export const totalFileCount = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_TOTAL_FILE_COUNT:
            return action.payload;
        default: 
            return state;
    }
}