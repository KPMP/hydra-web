import React, { Component } from 'react';
import { Col, Container, Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from '@fortawesome/free-regular-svg-icons';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantSummaryRows: [
                { field: "Participant ID", value: 12345 },
                { field: "Disease Type", value: "AKI" },
                { field: "Affiliation Site", value: "ABCDE" },
            ],
            participantSummaryColumns: [
                { name: "field", title: "Field" },
                { name: "value", title: "Value" },
            ],
            fileCountsByDataCategoryRows: [
                { data_category: "Transcriptomics", files: 99 },
                { data_category: "Imaging", files: 99 },
                { data_category: "Spatial Metabolics", files: 99 },
                { data_category: "Lipidomics", files: 99 },
                { data_category: "N-Glycomics", files: 99 },
                { data_category: "Spatial Transcriptomics", files: 99 },
            ],
            fileCountsByDataCategoryColumns: [
                { name: "data_category", title: "Data Category"},
                { name: "files", title: "Files"},
            ],
            fileCountsByStrategyRows: [
                { experimental_strategy: "Light Microscopic Whole Slide Image", files: 10 },
                { experimental_strategy: "Single-nucleus RNA-Seq", files: 21 },
                { experimental_strategy: "Single-cell RNA-Seq", files: 7 },
                { experimental_strategy: "Regional Transcriptomics", files: 1 },
                { experimental_strategy: "3D Tissue Imaging and Cytometry", files: 4 },
                { experimental_strategy: "Bulk Total/mRNA", files: "-" },
            ],
            fileCountsByStrategyColumns: [
                { name: "experimental_strategy", title: "Experimental Strategy"},
                { name: "files", title: "Files"},
            ],
            clinicalDemographicRows: [
                { field: "Sex", value: "Male" },
                { field: "Age", value: "70-79" },
                { field: "Ethnicity", value: "Hispanic" },
                { field: "Vital Status", value: "Alive" },
            ],
            clinicalDemographicColumns: [
                { name: "field", title: "Field" },
                { name: "value", title: "Value" },
            ],
            activeTab: '1'
        }
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab = (activeTab) => {
        this.setState({activeTab: activeTab});
    }

    render() {
        return (
            <div className='report-card ms-5 me-5'>
                <Row className='pt-2'>
                    <Col className='report-col col-sm-12 col-md-8 col-lg-10'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{height: 168}}>
                            <div className='report-header'>
                                Participant Summary
                            </div>
                        </Container>
                    </Col>
                    <Col className='report-col col-sm-12 col-md-4 col-lg-2'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm'>
                            <Row>
                                <Col className=''>
                                    Files
                                    <div className='h3'>
                                        99
                                    </div>
                                </Col>
                                <Col className='text-end align-bottom h1'>
                                    <FontAwesomeIcon
                                            className="fas fa-file fa-light" icon={faFile} />
                                </Col>
                            </Row>                      
                        </Container>
                    </Col>
                </Row>
                <Row className=''>
                    <Col className='report-col col-sm-12 col-md-12 col-lg-6'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{height: 311}}>
                            <div className='report-header'>
                                File Counts by Data Category
                            </div>
                        </Container>
                    </Col>
                    <Col className='report-col col-sm-12 col-md-12 col-lg-6'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{height: 311}}>
                            <div className='report-header'>
                                File Counts by Experimental Strategy
                            </div>
                        </Container>
                    </Col>
                </Row>
                <Row className=''>
                    <Col className='report-col col-12'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{height: 243}}>
                            <div className='report-header'>
                                Clinical
                            </div>
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab == '1' ? 'active' : ''}`} onClick={() => this.setActiveTab('1')}>
                                            Demographics
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab == '2' ? 'active' : ''}`} onClick={() => this.setActiveTab('2')}>
                                            Diagnoses / Treatments
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab == '3' ? 'active' : ''}`} onClick={() => this.setActiveTab('3')}>
                                            Family Histories
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab == '4' ? 'active' : ''}`} onClick={() => this.setActiveTab('4')}>
                                            Exposures
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab == '5' ? 'active' : ''}`} onClick={() => this.setActiveTab('5')}>
                                            Adjudication
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1"></TabPane>
                                    <TabPane tabId="2"></TabPane>
                                    <TabPane tabId="3"></TabPane>
                                    <TabPane tabId="4"></TabPane>
                                    <TabPane tabId="5"></TabPane>
                                </TabContent>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReportCard;