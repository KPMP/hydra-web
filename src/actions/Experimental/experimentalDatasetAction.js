import actionNames from '../actionNames'
import {fetchParticipantExperimentStrategyFileCounts} from "../../helpers/Api";

export const fetchAndSetExperimentalDataCounts = (participant_id) => {
    return async (dispatch) => {
        let experimentalDataCounts = await fetchParticipantExperimentStrategyFileCounts(participant_id);
        dispatch(setExperimentalDataCounts(experimentalDataCounts));
    }
}

export const setExperimentalDataCounts = (experimentalDataCounts) => {
  return {
      type: actionNames.SET_EXPERIMENTAL_DATASETS,
      payload: experimentalDataCounts
  }
}

