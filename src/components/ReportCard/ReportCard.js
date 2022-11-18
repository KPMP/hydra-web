import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Grid, Table, TableColumnResizing, TableHeaderRow} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { dataToTableConverter, experimentalDataConverter } from '../../helpers/dataHelper';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true
        }
    }
    getDefaultColumnWidths = () => {
        return [
            { columnName: 'key', width: 215 },
            { columnName: 'value', width: 180 },
        ]
    };
    getDefaultLinkColumnWidths = () => {
        return [
            { columnName: 'key', width: 380 },
            { columnName: 'value', width: 20 },
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
            link = '/' + row.tool + '?filters[0][field]=datatype&filters[0][values][0]=' + row.key + '&filters[0][type]=any&filters[1][field]=redcapid&filters[1][values][0]=' + this.props.redcapid + '&filters[1][type]=any'
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
    
    getLinkableColumns = () => {
        return [
            {
                name: 'key',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => this.formatLinkableCellKey(row)
            },
            {
                name: 'value',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => this.formatLinkableCellValue(row)
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
            <div className={`flyout shadow-sm border u-transition ${this.props.reportCardOpen ? "open" : "closed"}`}>
                <Row className="header u-gutter-fix">
                    <Col className="pt-1 pb-1">
                        <div className="pr-2 d-inline clickable" onClick={()=>{this.props.closeReportCard()}}>
                            <FontAwesomeIcon className="fa fa-angle-double-right" icon={faAngleDoubleRight} />
                        </div>
                        <span>Participant Information</span>
                    </Col>
                </Row>
                
                <div className="container">
                    <div className="report-card">
                        <React.Fragment>
                            <h4 className='mt-3'>Summary</h4>
                            <div className="u-border-helper">
                                <Grid rows={this.getRows(this.props.summaryDataset)} columns={this.getColumns()}>
                                    <Table/>
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                    <TableHeaderRow />
                                </Grid>
                            </div>
                        </React.Fragment>
                    </div>

                    <div className="report-card">
                        <React.Fragment>
                        <h4 className="mt-3">Clinical</h4>
                            <div className="u-border-helper">
                            <Grid rows={this.getRows(this.props.clinicalDataset)} columns={this.getColumns()}>
                                <Table />
                                <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                <TableHeaderRow />
                            </Grid>
                            </div>
                            
                        </React.Fragment>
                    </div>

                    <div className="report-card">
                        <React.Fragment>
                            <h4 className="mt-3">Counts By Experimental Strategy</h4>
                            <div className="u-border-helper">
                                
                                <Grid rows={this.getRowSets(this.props.experimentalDataCounts)} columns={this.getLinkableColumns()}>
                                    <Table columnExtensions={[{ columnName: 'value', align: 'right' }]} />
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultLinkColumnWidths()} />
                                    <TableHeaderRow />
                                </Grid> 
                            </div>
                        </React.Fragment>
                    </div>
                    <div className="mt-3 mb-3 font-italic">
                        <small><span className="u-controlled-access-asterisk">*</span> = Aggregated dataset opens in Explorer</small>
                    </div>
                </div>
            </div>
        )
    }
}

ReportCard.propTypes = {
    reportCardOpen: PropTypes.bool.isRequired,
    closeReportCard: PropTypes.func.isRequired,
    summaryDataset: PropTypes.object.isRequired,
    clinicalDataset: PropTypes.object.isRequired,
    experimentalDataCounts: PropTypes.object.isRequired,
}

export default ReportCard;