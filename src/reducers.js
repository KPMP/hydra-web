import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset, tableSettings } from "./components/Repository/fileListReducer";
import { summaryDatasets, clinicalDatasets, dataTypeFileCounts } from "./components/Repository/clinicalDatasetReducer";
import { experimentalDataCounts } from "./components/Repository/experimentalDataCountReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset,
  tableSettings,
  summaryDatasets,
  clinicalDatasets,
  experimentalDataCounts,
  dataTypeFileCounts
});

export default appReducer;
