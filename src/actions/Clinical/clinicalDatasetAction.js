import actionNames from '../actionNames';
import { mapSummaryKeysToPresentationStyle } from '../../helpers/dataHelper';
import { fetchParticipantSummaryDataset } from '../../helpers/Api';


export const fetchAndSetSummaryDatasets = (participant_id) => {
  return async (dispatch) => {
      let summaryDatasets = await fetchParticipantSummaryDataset(participant_id);
      summaryDatasets = mapSummaryKeysToPresentationStyle(summaryDatasets);
      dispatch(setSummaryDatasets(summaryDatasets));
  }
}

export const setSummaryDatasets = (summaryDatasets) => {
  return {
      type: actionNames.SET_SUMMARY_DATASETS,
      payload: summaryDatasets
  }
}

export const setClinicalDatasets = (clinicalDatasets) => {
  return {
      type: actionNames.SET_CLINICAL_DATASETS,
      payload: clinicalDatasets
  }
}


