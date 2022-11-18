import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import ImageDatasetListSubContainer from "./ImageDatasetListSubContainer";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/view"));
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDatasetListSubContainer))