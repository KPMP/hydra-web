import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import FileListHolder from "./FileListHolder";
import {
    fetchAndSetExperimentalDataCounts,
} from "../../actions/Experimental/experimentalDatasetAction";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings,
        experimentalDataCounts: state.experimentalDataCounts
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/view"));
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         },
         setExperimentalDataCounts(participant_id){
            dispatch(fetchAndSetExperimentalDataCounts(participant_id));
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListHolder, FileList))