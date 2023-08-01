import actionNames from '../actionNames';
import { mapSummaryKeysToPresentationStyle } from '../../helpers/dataHelper';
import { fetchParticipantDataTypeCounts, fetchParticipantSummaryDataset } from '../../helpers/Api';


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

export const fetchAndSetDataTypeFileCounts = (participant_id) => {
  return async (dispatch) => {
      let dataTypeFileCounts = await fetchParticipantDataTypeCounts(participant_id);
      dispatch(setDataTypeFileCounts(dataTypeFileCounts));
  }
}

export const setDataTypeFileCounts = (dataTypeFileCounts) => {
  return {
    type: actionNames.SET_DATA_TYPE_COUNTS,
    payload: dataTypeFileCounts
  }
}

