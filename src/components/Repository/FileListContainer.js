import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import { fetchAndSetSummaryDatasets } from '../../actions/Clinical/clinicalDatasetAction';
import FileListHolder from "./FileListHolder";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings,
        summaryDatasets: state.summaryDatasets
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/view"));
         },
         async setParticipantReport(participant_id) {
            await dispatch(fetchAndSetSummaryDatasets(participant_id));
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListHolder))