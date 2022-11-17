import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import 'vitessce/dist/esm/index.css';
import { Row, Col } from "reactstrap";
import { getViewConfig, populateViewConfig } from './viewConfigHelper';
import { Redirect } from 'react-router-dom';
import { handleGoogleAnalyticsEvent } from "../../helpers/googleAnalyticsHelper";
import ReportCard from '../ReportCard/ReportCard';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: '',
            noData: true,
            reportCardOpen: false
        }
        this.props.setSummaryDatasets(this.props.selectedImageDataset["redcapid"])
        this.props.setClinicalDatasets(this.props.selectedImageDataset["redcapid"])
        this.props.setExperimentalDataCounts(this.props.selectedImageDataset["redcapid"])   
    }


    async componentDidMount() {
        if (this.props.selectedImageDataset) {
            handleGoogleAnalyticsEvent(
                'Spatial Viewer',
                'Navigation',
                this.props.selectedImageDataset["spectrackSampleId"] 
                + this.props.selectedImageDataset['imagetype']);
            let viewConfig = getViewConfig(this.props.selectedImageDataset["configtype"]);
            viewConfig = await populateViewConfig(viewConfig, this.props.selectedImageDataset);
            this.setState({viewConfig: viewConfig, noData: false});
        }
    }

    openReportCard = () => {
        this.setState({reportCardOpen: true})
    }

    closeReportCard = () => {
        this.setState({reportCardOpen: false})
    }

    render() {     
        if (!this.props.selectedImageDataset || (this.props.selectedImageDataset && Object.keys(this.props.selectedImageDataset).length === 0)) {
            return <Redirect to='/' />
        }
        const summaryDataset = this.props.summaryDatasets
        const experimentalDataCounts = this.props.experimentalDataCounts
        const clinicalDataset = this.props.clinicalDatasets

        return (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mx-3 p-3">
                    <ReportCard 
                        reportCardOpen={this.state.reportCardOpen}
                        closeReportCard={this.closeReportCard}
                        summaryDataset={summaryDataset}
                        clinicalDataset={clinicalDataset}
                        experimentalDataCounts={experimentalDataCounts}
                        redcapid={this.props.selectedImageDataset["redcapid"]}
                    />

                    {!this.state.noData &&
                        <div>
                    <Row xs='12'>                        
                        <Col xs='8'>
                            <h5>
                                {`${this.props.selectedImageDataset["datatype"]} 
                                for ${this.props.selectedImageDataset["tissuetype"]} 
                                sample ${this.props.selectedImageDataset["spectracksampleid"]} 
                                (participant`} 
                                <button
                                    type="button"
                                    class="btn btn-link text-left p-0 u-text-decoration-none"
                                    onClick={()=>{this.openReportCard()}}>
                                    {`${this.props.selectedImageDataset["redcapid"]}`}
                                </button>
                                {`)`}
                            </h5>
                        </Col>
                        <Col xs='4' className="text-right text-primary ">
                            <button onClick={() => {this.props.history.goBack()}} type='button' className='btn btn-link'>
                                <h5><span style={{"font-size":"26px"}}>&larr;</span> Close viewer</h5></button></Col>
                    </Row>
                    
                    <Vitessce
                    config={this.state.viewConfig}
                    height={window.innerHeight - 200}
                    theme="light" />
                </div>
            }
                </div>
            </div>
        )
    }
}

export default SpatialViewer;
