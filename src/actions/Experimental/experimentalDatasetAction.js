import actionNames from '../actionNames'


export const setExperimentalDataCounts = (experimentalDataCounts) => {
  return {
      type: actionNames.SET_EXPERIMENTAL_DATASETS,
      payload: experimentalDataCounts
  }
}

