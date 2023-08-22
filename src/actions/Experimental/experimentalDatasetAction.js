import actionNames from '../actionNames'
import {fetchParticipantExperimentCounts} from "../../helpers/Api";

export const fetchAndSetExperimentalDataCounts = (participant_id) => {
    return async (dispatch) => {
        let experimentalDataCounts = await fetchParticipantExperimentCounts(participant_id);
        dispatch(setExperimentalDataCounts(experimentalDataCounts));
    }
}

export const setExperimentalDataCounts = (experimentalDataCounts) => {
  return {
      type: actionNames.SET_EXPERIMENTAL_DATASETS,
      payload: experimentalDataCounts
  }
}

