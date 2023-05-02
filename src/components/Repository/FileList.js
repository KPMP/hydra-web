import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, Col, Container, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { resultConverter } from "../../helpers/dataHelper";
import { faXmark, faAnglesRight, faAnglesLeft, faDownload, faUnlock, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compareTableStrings } from "./spatialHelper";
import prettyBytes from 'pretty-bytes';
import fetch from 'node-fetch';
import {
    SortingState,
    IntegratedSorting,
    IntegratedPaging,
    PagingState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnResizing,
    ColumnChooser,
    TableColumnVisibility,
    Toolbar,
    TableColumnReordering,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { ToolbarButtonState } from './Plugins/toolbar-button-state.js';
import { ToolbarButton } from './Plugins/toolbar-button.js';

import { PaginationState } from './Plugins/pagination-state.js';
import { Pagination } from './Plugins/pagination.js';

import FileFacet from './FileFacet';
import ParticipantFacet from './ParticipantFacet';
import "@elastic/react-search-ui-views/lib/styles/styles.css";

class FileList extends Component {

    constructor(props) {
        super(props);
        const columnCards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable}
        });
        this.state = {
            accessAlertModal: false,
            filterTabActive: true,
            activeFilterTab: 'FILE',
            tableData: [],
            cards: this.props.props.tableSettings.cards || columnCards,
            currentPage: this.props.props.tableSettings.currentPage,
            isLoaded: false
        };

    }

    getSearchResults = () => {
        let data = resultConverter(this.props.results);
        this.setState({ "tableData": data });
    };

    async componentDidMount() {
        await this.getSearchResults();
        this.setState({isLoaded: true})
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.results !== prevProps.results) {
                this.getSearchResults();
            }
            if (this.props.filters !== prevProps.filters) {
                this.props.props.setTableSettings({currentPage: 0});
            }
        }
    };

    setCards = (cards) => {
        this.setState({cards});
    };
    
    setDefaultCards = () => {
        const cards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable}
        });
        this.setCards(cards)
    };

    getWorkflowTypeValue = (row) => {
        return row['workflow_type']
    }

    toggleAccessAlertModal = () => {
        this.setState({accessAlertModal: !this.state.accessAlertModal})
        return
    }

    accessAlertModal = () => {
        return <div>
            <Modal isOpen={this.state.accessAlertModal}>
                <ModalHeader toggle={this.toggle}>Access Alert</ModalHeader>
                <ModalBody>
                <p>You are attempting to download files that are considered controlled access. To protect the privacy of our study participants, a signed Data Use Agreement is required to gain access to this data.</p>
                <p>Click the button below to request access.</p>    
                </ModalBody>
                <ModalFooter>
                    <Button 
                    className="btn btn-primary"
                        onClick={(e) => {this.toggleAccessAlertModal()}}>Cancel</Button>{' '}
                    <Button color='primary'
                className="btn btn-primary" onClick={(e)=>{window.open("https://app.smartsheet.com/b/form/9f20e0eb3f334b388f78a539e3396fd5")}}>Request Access</Button>
                </ModalFooter>
            </Modal>

        </div>
    }
    downloadFile = (url) => {
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    // This is used for column ordering too.
    getColumns = () => {
        let columns = [
            {
                name: 'download',
                title: 'download',
                sortable: true,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => { return <span onClick={(e) => {
                    row['access'] === 'controlled' ?
                        this.toggleAccessAlertModal() : 
                        this.downloadFile(`https://atlas.kpmp.org/api/v1/file/download/${row['package_id']}/${row['file_name']}`, row['file_name'])
                }} className="clickable download-btn">
                    <FontAwesomeIcon
                        className="fas fa-angles-left " icon={faDownload} />
                    </span>
                    }
            },
            {
                name: 'access',
                title: 'Access',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: row => { return <span>
                    <FontAwesomeIcon
                    className="fas fa-angles-left " icon={row['access'] === 'controlled' ? faUnlock: faUnlockKeyhole } /> {row['access']}</span> }
            },   
            {
                name: 'file_id',
                title: 'File UUID',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },
            {
                name: 'file_name',
                title: 'File Name',
                sortable: true,
                hideable: false,
                defaultHidden: false,
            },
            {
                name: 'data_category',
                title: 'Data Category',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'data_format',
                title: 'Data Format',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'file_size',
                title: 'Size',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'data_type',
                title: 'Data Type',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },
            {
                name: 'experimental_strategy',
                title: 'Experimental Strategy',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },            
            {
                name: 'workflow_type',
                title: 'Workflow Type',
                sortable: true,
                hideable: true,
                defaultHidden: true,
                getCellValue: row => { return (row['workflow_type'] ? row['workflow_type'] : '--') }

            },
            {
                name: 'platform',
                title: 'Platform',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'redcap_id',
                title: 'Participant ID',
                sortable: true,
                hideable: true,
                defaultHidden: false, 
            },
            {
                name: 'dois',
                title: 'DOIs',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
        ];
        return columns;
    };

    getDefaultHiddenColumnNames = (columns) => {
        return columns.filter((column) => {
            return column.defaultHidden === true
          }).map((column) => {
            return column.name;
          })
    };


    getDefaultColumnWidths = () => {
        return [
            { columnName: 'download', width: 32 },
            { columnName: 'data_format', width: 132 },
            { columnName: 'redcap_id', width: 153 },
            { columnName: 'access', width: 100 },
            { columnName: 'file_name', width: 983 },
            { columnName: 'data_category', width: 151 },
            { columnName: 'workflow_type', width: 200 },
            { columnName: 'platform', width: 200 },
            { columnName: 'file_size', width: 74 },
            { columnName: 'file_id', width: 200 },
            { columnName: 'data_type', width: 200 },
            { columnName: 'dois', width: 200 },
            { columnName: 'experimental_strategy', width: 210 },
        ]
    };

    toggleFilterTab = () => {
        if(this.state.filterTabActive) {
            this.setState({filterTabActive: false});
        } else {
            this.setState({filterTabActive: true});
        }
    };
  
    getPageSizes = () => {
        return [10,20,40,80,100]
    };

    getFilterPills = (filters) => {
        return filters.map(
            filter => {
                return filter.values.map(value => {
                    return (
                        <div
                            key={(filter.field).toString() + value.toString()}
                            className="border rounded activeFilter">
                            <span>{value}
                                <FontAwesomeIcon
                                    alt="Close Filter"
                                    onClick={()=>{
                                        this.props.removeFilter(filter.field, value)
                                    }}
                                    className="close-button fas fa-xmark ml-2"
                                    icon={faXmark} />
                            </span>
                        </div>)
                })
            })
    };

    render() {
        const tabEnum = {
            PARTICIPANT: 'PARTICIPANT',
            FILE: 'FILE'
        };

        const { pagingSize, columnWidths, hiddenColumnNames, sorting, currentPage} = this.props.props.tableSettings;

        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
                <Row>
                    <Col xl={3}>
                        <div className={`filter-panel-wrapper ${this.state.filterTabActive ? '': 'hidden'}`}>
                        <div className="filter-panel-tab-wrapper">
                            
                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.PARTICIPANT)}}
                                 className={`filter-tab ${this.props.activeFilterTab === tabEnum.PARTICIPANT ? 'active' : ''} rounded border`}>
                                    PARTICIPANT
                            </div>

                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.FILE)}}
                                 className={`filter-tab ${this.props.activeFilterTab === tabEnum.FILE ? 'active' : ''} rounded border`}>
                                    FILE
                            </div>


                            <div className="filter-tab filter-tab-control-icon clickable"
                                 alt="Close Filter Tab"
                                 onClick={() => {this.toggleFilterTab()}}>                                
                                <FontAwesomeIcon
                                    className="fas fa-angles-left " icon={faAnglesLeft} />
                            </div>
                        </div>
                        {this.accessAlertModal()}
                            <React.Fragment>
                           
                            {this.props.activeFilterTab === tabEnum.FILE &&
                                <FileFacet/>
                            }

                            {this.props.activeFilterTab === tabEnum.PARTICIPANT &&
                               <ParticipantFacet/>
                            }
                            </React.Fragment>
                        </div>

                    </Col>
                    <Col xl={`${this.state.filterTabActive ? 9 : 12 }`}>
                        <Row>
                            <Col 
                                className={`filter-collapse clickable ${this.state.filterTabActive ? 'hidden': ''}`}
                                xl={1}
                                alt="Open Filter Tab"
                                onClick={() => {this.toggleFilterTab()}}>
                            <FontAwesomeIcon
                                    className="fas fa-angles-left" icon={faAnglesRight} />
                            </Col>
                            <Col xl={12} className={`my-0 activeFilter-column ${this.state.filterTabActive ? 'closed': ''}`}>
                                {this.props.filters.length === 0 ?

                                <Row className="filter-pill-row inactive-filters">
                                    <span>Select a spatial dataset from the list below to visualize it in the <a target="_blank" rel="noreferrer" href="http://vitessce.io/">Vitessce</a> visual integration tool.</span>
                                </Row>
                                :
                                <Row className="filter-pill-row">
                                    {this.getFilterPills(this.props.filters)}
                                </Row>}
                                
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <div className='container-max data-table-wrapper'>
                                <div className="data-table">
                                    <React.Fragment>
                                    { this.state.isLoaded ?
                                    <Grid
                                        rows={this.state.tableData}
                                        columns={this.getColumns()}>
                                        <SortingState
                                            defaultSorting={[]}
                                            onSortingChange={(sorting) =>  this.props.props.setTableSettings({sorting: sorting})}
                                            sorting={sorting}/>
                                        <IntegratedSorting 
                                            columnExtensions={[
                                                { columnName: 'data_type', compare: compareTableStrings },
                                                { columnName: 'file_size', compare: (a, b) => a - b }
                                            ]}
                                        />
                                        <DataTypeProvider
                                            for = {["file_size"]}
                                            formatterComponent = {({value}) => <span>{prettyBytes(parseInt(value))}</span>}
                                        />
                                        <PagingState
                                            currentPage={currentPage}
                                            defaultPageSize={pagingSize}
                                            onCurrentPageChange={(page) => this.props.props.setTableSettings({currentPage: page})}
                                        />
                                        <IntegratedPaging />
                                        <PagingPanel />
                                        <Toolbar
                                            cards={this.state.cards}
                                            setCards={this.state.setCards}
                                        />
                                        <ToolbarButtonState setTableSettings={this.props.props.setTableSettings} />
                                        <Table />
                                        <TableColumnResizing
                                            defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={30}
                                            onColumnWidthsChange={(columnWidths) =>  this.props.props.setTableSettings({columnWidths: columnWidths})}
                                            columnWidths={columnWidths}
                                        />

                                        <TableColumnReordering
                                            order={(this.state.cards).map(item => item.name)}
                                            defaultOrder={this.getColumns().map(item => item.name)}
                                        />
                                        <TableHeaderRow showSortingControls />
                                        <TableColumnVisibility
                                            defaultHiddenColumnNames={this.getDefaultHiddenColumnNames(this.getColumns())}
                                            hiddenColumnNames={hiddenColumnNames}
                                            onHiddenColumnNamesChange={(hiddenColumnNames) => {this.props.props.setTableSettings({hiddenColumnNames: hiddenColumnNames})}}
                                        />
                                        <ColumnChooser />
                                        
                                        <ToolbarButton 
                                            cards={this.state.cards}
                                            setCards={this.setCards}
                                            setDefaultCards={this.setDefaultCards}
                                            defaultOrder={this.getColumns().map(item => item.name)} />
                                        <PaginationState
                                            currentPage={currentPage}
                                            setTableSettings={this.props.props.setTableSettings}
                                            pagingSize={pagingSize}/>
                                        <Pagination pageSizes={this.getPageSizes()} />
                                    </Grid>
                                    : <Spinner animation="border" variant="primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner> }
                                        </React.Fragment>
                                </div>
                            </div>
                        </DndProvider>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FileList;
