import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset, tableSettings } from "./components/Repository/imageDatasetReducer";
import { summaryDatasets, clinicalDatasets } from "./components/Repository/clinicalDatasetReducer";
import { experimentalDataCounts } from "./components/Repository/experimentalDataCountReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset,
  tableSettings,
  summaryDatasets,
  clinicalDatasets,
  experimentalDataCounts,
});

export default appReducer;
