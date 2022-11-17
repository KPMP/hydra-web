import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset, tableSettings } from "./components/SpatialViewer/imageDatasetReducer";
import { summaryDatasets, clinicalDatasets } from "./components/SpatialViewer/clinicalDatasetReducer";
import { experimentalDataCounts } from "./components/SpatialViewer/experimentalDataCountReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset,
  tableSettings,
  summaryDatasets,
  clinicalDatasets,
  experimentalDataCounts,
});

export default appReducer;
