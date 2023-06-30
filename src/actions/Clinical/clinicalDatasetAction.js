import actionNames from '../actionNames'


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


