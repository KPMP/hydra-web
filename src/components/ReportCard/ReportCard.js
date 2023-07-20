import { Component } from 'react';
import { Col, Container, Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { Grid, Table, TableColumnResizing, TableHeaderRow} from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { dataToTableConverter, experimentalDataConverter } from '../../helpers/dataHelper';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            summaryDataset: {},
            experimentalDataCounts: {}
        }
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    componentDidMount() {
        let sessionStorage = JSON.parse(window.sessionStorage.getItem('hydra-redux-store'));
        if(sessionStorage === null || Object.keys(sessionStorage["summaryDatasets"]).length === 0){
            window.location.replace('/');
        }
        this.setState({
            summaryDataset: sessionStorage["summaryDatasets"],
            experimentalDataCounts: sessionStorage['experimentalDataCounts'],
            isLoaded: true
        })
    }

    setActiveTab = (activeTab) => {
        this.setState({activeTab: activeTab});
    }
    getDefaultColumnWidths = () => {
        return [
            { columnName: 'key', width: 215 },
            { columnName: 'value', width: 180 },
        ]
    };
    getDefaultLinkColumnWidths = () => {
        return [
            { columnName: 'Experimental Strategy', width: 380 },
            { columnName: 'Files', width: 30 },
        ]
    };
    getColumns = () => {
        return [
            {
                name: 'key',
                sortable: false,
                hideable: false,
                defaultHidden: false,
            },
            {
                name: 'value',
                sortable: false,
                hideable: false,
                defaultHidden: false,
            },
        ];
    };

    formatLinkableCellKey = (row) => {
        let key = row['key'];
       if(row.isAggregated) {
            key = (<div>{`${row['key']}`} <span className="u-controlled-access-asterisk">*</span></div>);
        } else {
            key = (<div>{`${row['key']}`}</div>);
        }
        return( key )
    }

    formatLinkableCellValue = (row) => {
        let link = '/'
        if (row.tool === 'spatial-viewer') {
            link = '/' + row.tool + '?filters[0][field]=datatype&filters[0][values][0]=' + row.key + '&filters[0][type]=any&filters[1][field]=redcapid&filters[1][values][0]=' + this.state.summaryDataset['Participant ID'] + '&filters[1][type]=any'
        } else if (row.tool === 'explorer') {
            let dataType = '';
            if (row.key.includes('Single-cell')) {
                dataType = 'sc'
            } else if (row.key.includes('Single-nuc')) {
                dataType = 'sn'
            } else if (row.key.includes('Regional')) {
                dataType = 'regionalViz'
            }
            link = '/' + row.tool + '/dataViz?dataType=' + dataType
        }

        return( row['value'] > 0 ? <a className="p-0" href={link}>{row['value']}</a>: <span>{row['value']}</span>)
    }
    
    getExperimentalLinkableColumns = () => {
        return [
            {
                name: 'Experimental Strategies',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => this.formatLinkableCellKey(row)
            },
            {
                name: 'Files',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => <div style={{textAlign: 'right'}}>{this.formatLinkableCellValue(row)}</div>
            }
        ];
    };

    getRowSets = (dataset) => {
        return  experimentalDataConverter(dataset)
    }

    getRows = (dataset) => {
        return dataToTableConverter(dataset)
    }

    render() {
        return (
            <div className='report-card ms-5 me-5'>
                <Row className='pt-2'>
                    <Col className='report-col col-sm-12 col-md-8 col-lg-10'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm'>
                            <div className='report-header mb-3'>
                                Participant Summary
                            </div>
                            <Grid rows={this.getRows(this.state.summaryDataset)} columns={this.getColumns()}>
                                <Table/>
                                <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                            </Grid>
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
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{height: 'fit-content'}}>
                            <div className='report-header'>
                                File Counts by Experimental Strategy
                            </div>
                            <Grid rows={this.getRowSets(this.state.experimentalDataCounts)} columns={this.getExperimentalLinkableColumns()}>
                                    <Table columnExtensions={[{ columnName: 'Files', align: 'right' }]} />
                                    <TableHeaderRow />
                                </Grid> 
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
                                        <NavLink className={`tab-pane ${this.state.activeTab === '1' ? 'active' : ''}`} onClick={() => this.setActiveTab('1')}>
                                            Demographics
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab === '2' ? 'active' : ''}`} onClick={() => this.setActiveTab('2')}>
                                            Diagnoses / Treatments
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab === '3' ? 'active' : ''}`} onClick={() => this.setActiveTab('3')}>
                                            Family Histories
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab === '4' ? 'active' : ''}`} onClick={() => this.setActiveTab('4')}>
                                            Exposures
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={`tab-pane ${this.state.activeTab === '5' ? 'active' : ''}`} onClick={() => this.setActiveTab('5')}>
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