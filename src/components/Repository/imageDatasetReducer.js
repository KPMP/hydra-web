import actionNames from "../../actions/actionNames";

export const selectedImageDataset = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_IMAGE_DATASET:
            return action.payload;
        default:
            return state;
    }
};

export const tableSettings = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_TABLE_SETTINGS:
            let newState = {...state, ...action.payload};
            return newState;
        default:
            return state;
    }
};