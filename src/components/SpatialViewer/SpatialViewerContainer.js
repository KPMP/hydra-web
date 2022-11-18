import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";
import { withRouter } from 'react-router';
import { setClinicalDatasets, setSummaryDatasets } from "../../actions/Clinical/clinicalDatasetAction";
import { setExperimentalDataCounts } from "../../actions/Experimental/experimentalDatasetAction";
import { mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle } from "../../helpers/dataHelper";
import { fetchParticipantSummaryDataset, fetchParticipantExperimentCounts, fetchParticipantClinicalDataset } from "../../helpers/Api";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        async setSummaryDatasets(participant_id) {
            let summaryDatasets = await fetchParticipantSummaryDataset(participant_id);
            summaryDatasets = mapSummaryKeysToPresentationStyle(summaryDatasets);
            dispatch(setSummaryDatasets(summaryDatasets));
        },
        async setClinicalDatasets(participant_id) {
            let clinicalDatasets = await fetchParticipantClinicalDataset(participant_id);
            if (clinicalDatasets) {
                clinicalDatasets = JSON.parse(clinicalDatasets.clinicalData);
            }
            clinicalDatasets = mapClinicalKeysToPresentationStyle(clinicalDatasets);
            dispatch(setClinicalDatasets(clinicalDatasets));
        },
        async setExperimentalDataCounts(participant_id) {
            let experimentalDataCounts = await fetchParticipantExperimentCounts(participant_id);
            dispatch(setExperimentalDataCounts(experimentalDataCounts));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpatialViewer));