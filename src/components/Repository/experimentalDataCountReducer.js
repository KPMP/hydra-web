import actionNames from "../../actions/actionNames";

export const experimentalDataCounts = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_EXPERIMENTAL_DATASETS:
            return action.payload;
        default:
            return state;
    }
};

export const selectedParticipant = ( state = "", action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_PARTICIPANT:
            return action.payload;
        default:
            return state;
    }
}