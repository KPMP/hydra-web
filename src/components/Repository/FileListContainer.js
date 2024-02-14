import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import { fetchAndSetClinicalDatasets, fetchAndSetDataTypeFileCounts, fetchAndSetSummaryDatasets, fetchAndSetTotalFileCount } from '../../actions/Clinical/clinicalDatasetAction';
import FileListHolder from "./FileListHolder";
import {
    fetchAndSetExperimentalDataCounts,
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
            console.log("get summary datasets")
            await dispatch(fetchAndSetExperimentalDataCounts(participant_id));
            console.log("got experimental data")
            await dispatch(fetchAndSetDataTypeFileCounts(participant_id));
            console.log("got data type file counts")
            await dispatch(fetchAndSetClinicalDatasets(participant_id));
            console.log("got clinical data")
            await dispatch(fetchAndSetTotalFileCount(participant_id));
            console.log("got total file counts")
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         },
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListHolder))