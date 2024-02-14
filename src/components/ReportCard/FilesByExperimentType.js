import React, {Component} from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { Row, Col } from 'reactstrap';

class FilesByExperimentType extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
    }

    handleEmptyCounts(count, row){
        return count === 0 ? "0" : this.formatDataTypeValueCell(count, row)
    }

    handleDataTypeValueClick(row) {
        let linkType = row.linkInformation.linkType;
        let linkValue = row.linkInformation.linkValue.replace('&', '%26');
        let mapping = `/repository/?size=n_20_n&filters[0][field]=redcap_id&filters[0][values][0]=${this.props.participantId}&filters[0][type]=any&filters[1][field]=${linkType}&filters[1][values][0]=${linkValue}&filters[1][type]=any`;
        if(linkType && linkValue){
            return encodeURI(mapping).replace('%2526', '%26');
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', row.dataType)
        }
    }
  
    formatDataTypeValueCell(value, row) {
        return (
            <a href={`${this.handleDataTypeValueClick(row)}`}>
                <span className="buttonhref">
                    {value}
                </span>
            </a>
        );
    }


    getColumnExtensions() {

        return [
            { columnName: 'dataType', width: 'auto'},
            { columnName: 'count', width: 'auto', align: 'center'},
        ]
    }

    getColumns() {
        return [
            {
                title: <span className="table-header omics data-type-table-header">Experimental Strategies</span>,
                name: 'dataType',
                getCellValue: row => <div className='data-type-table-content' style={{'flex': '250 0 auto'}} role='gridcell'>{row.dataType}</div>
                
            },
            {
                title: <span className="data-type-table-header">Files</span>,
                name: 'count',
                getCellValue: row => <div className='rt-td data-type-table-content' style={{'flex': '250 0 auto','textAlign': 'center'}} role='gridcell'>{this.handleEmptyCounts(row.count, row)}</div>
            }
        ]
    }

    render() {
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <Grid rows={this.props.experimentalDataCounts} columns={this.getColumns()}>
                            <Table columnExtensions={this.getColumnExtensions()}/>
                            <TableHeaderRow/>
                            <TableFixedColumns/>
                        </Grid>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default FilesByExperimentType;
