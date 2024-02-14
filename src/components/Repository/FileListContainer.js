import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import { fetchAndSetClinicalDatasets, fetchAndSetDataTypeFileCounts, fetchAndSetSummaryDatasets, fetchAndSetTotalFileCount } from '../../actions/Clinical/clinicalDatasetAction';
import FileListHolder from "./FileListHolder";
import {
    fetchAndSetExperimentalDataCounts, setSelectedParticipant
} from "../../actions/Experimental/experimentalDatasetAction";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings,
        summaryDatasets: state.summaryDatasets,
        experimentalDataCounts: state.experimentalDataCounts
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/view"));
         },
         async setParticipantReport(participant_id) {
            await dispatch(fetchAndSetSummaryDatasets(participant_id));
            await dispatch(fetchAndSetExperimentalDataCounts(participant_id));
            await dispatch(fetchAndSetDataTypeFileCounts(participant_id));
            await dispatch(fetchAndSetClinicalDatasets(participant_id));
            await dispatch(fetchAndSetTotalFileCount(participant_id));
            dispatch(setSelectedParticipant(participant_id));
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         },
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListHolder))