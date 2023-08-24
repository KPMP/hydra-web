import { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { Grid, Table, TableColumnResizing, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { dataToTableConverter, experimentalDataConverter, fileCountsToTableConverter, mapClinicalKeysToPresentationStyle } from '../../helpers/dataHelper';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryDataset: {},
            totalFileCount: "",
            experimentalDataCounts: {},
            dataTypeFileCounts: [],
            clinicalDataset: {}
        }
    }

    componentDidMount() {
        let sessionStorage = JSON.parse(window.sessionStorage.getItem('hydra-redux-store'));
        if (sessionStorage === null || Object.keys(sessionStorage["summaryDatasets"]).length === 0) {
            window.location.replace('/');
        }
        this.setState({
            summaryDataset: sessionStorage["summaryDatasets"],
            experimentalDataCounts: sessionStorage['experimentalDataCounts'],
            dataTypeFileCounts: sessionStorage['dataTypeFileCounts']['repositoryDataTypes'],
            clinicalDataset: (sessionStorage['clinicalDatasets']['clinicalData']) ? JSON.parse(sessionStorage['clinicalDatasets']['clinicalData']) : {},
            totalFileCount: sessionStorage['totalFileCount'],
            isLoaded: true
        })
    }

    getTotalFileCountLink = () => {
        return this.state.totalFileCount !== "" ? '/repository?filters[0][field]=' 
                + this.state.totalFileCount['linkInformation']['linkType'] 
                + '&filters[0][values][0]=' 
                + this.state.totalFileCount['linkInformation']['linkValue'] 
                + '&filters[0][type]=any' : "";
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
        return( key )
    }

    formatLinkableCellValue = (row) => {
        let link = '/'
        if (row.tool === 'spatial-viewer') {
            link = '/' + row.tool + '?filters[0][field]=datatype&filters[0][values][0]=' + row.key + '&filters[0][type]=any&filters[1][field]=redcapid&filters[1][values][0]=' + this.state.summaryDataset['Participant ID'] + '&filters[1][type]=any'
        } else if (row.tool === 'explorer') {
            link += row.tool;
            if (row.key.includes('Single-cell')) {
                link += '/dataViz?dataType=sc';
            } else if (row.key.includes('Single-nuc')) {
                link += '/dataViz?dataType=sn';
            } else if (row.key.includes('Regional')) {
                link +='/regionalviz?dataType=rt';
            }
        }

        return (row['value'] > 0 ? <a className="p-0" href={link}>{row['value']}</a> : <span>{row['value']}</span>)
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
                getCellValue: row => <div style={{ textAlign: 'right' }}>{this.formatLinkableCellValue(row)}</div>
            }
        ];
    };

    getRowSets = (dataset) => {
        return experimentalDataConverter(dataset)
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
                                <Table />
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
                                        <a href={this.getTotalFileCountLink()}>{this.state.totalFileCount['count']}</a>
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
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{ height: 'fit-content' }}>
                            <div className='report-header'>
                                File Counts by Data Type
                            </div>
                            <Grid rows={fileCountsToTableConverter(this.state.dataTypeFileCounts, this.state.summaryDataset['Participant ID'])} columns={this.getColumns()}>
                                <Table />
                            </Grid>
                        </Container>
                    </Col>
                    <Col className='report-col col-sm-12 col-md-12 col-lg-6'>
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{ height: 'fit-content' }}>
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
                        <Container className='container-max landing mb-4 rounded border p-3 pt-2 shadow-sm' style={{ height: 'fit-content' }}>
                            <div className='report-header'>
                                Clinical
                            </div>
                            <Grid rows={this.getRows(mapClinicalKeysToPresentationStyle(this.state.clinicalDataset))} columns={this.getColumns()}>
                                <Table />
                                <TableColumnResizing defaultColumnWidths={[
                                    { columnName: 'key', width: 350 },
                                    { columnName: 'value', width: 500 },
                                ]} />
                            </Grid>
                        </Container>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ReportCard;