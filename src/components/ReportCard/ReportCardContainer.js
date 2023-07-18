import {connect} from "react-redux";
import ReportCard from "./ReportCard";
import { withRouter } from 'react-router';
import {
    fetchAndSetClinicalDatasets,
    fetchAndSetSummaryDatasets
} from "../../actions/Clinical/clinicalDatasetAction";
import {
    fetchAndSetExperimentalDataCounts
} from "../../actions/Experimental/experimentalDatasetAction";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSummaryDatasets(participant_id) {
            dispatch(fetchAndSetSummaryDatasets(participant_id));
        },
        setClinicalDatasets(participant_id) {
            dispatch(fetchAndSetClinicalDatasets(participant_id));
        },
        setExperimentalDataCounts(participant_id) {
            dispatch(fetchAndSetExperimentalDataCounts(participant_id));
        },

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportCard));