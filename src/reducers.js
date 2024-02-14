import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset, tableSettings } from "./components/Repository/fileListReducer";
import { summaryDatasets, clinicalDatasets, dataTypeFileCounts, totalFileCount } from "./components/Repository/clinicalDatasetReducer";
import { experimentalDataCounts, selectedParticipant } from "./components/Repository/experimentalDataCountReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset,
  tableSettings,
  summaryDatasets,
  clinicalDatasets,
  experimentalDataCounts,
  dataTypeFileCounts,
  totalFileCount,
  selectedParticipant
});

export default appReducer;
