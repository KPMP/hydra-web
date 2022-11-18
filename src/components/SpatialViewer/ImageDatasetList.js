import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Col, Container, Row, Spinner } from "reactstrap";
import { resultConverter } from "../../helpers/dataHelper";
import { getImageTypeTooltipCopy } from "./viewConfigHelper";
import { faXmark, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compareTableStrings } from "./spatialHelper";
import {
    SortingState,
    IntegratedSorting,
    IntegratedPaging,
    PagingState,
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

import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        const columnCards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable}
        });
        this.state = {
            filterTabActive: true,
            activeFilterTab: 'DATASET',
            tableData: [],
            cards: this.props.props.tableSettings.cards || columnCards,
            currentPage: this.props.props.tableSettings.currentPage,
            isLoaded: false
        };

    }

    getSearchResults = () => {
        let spatialData = resultConverter(this.props.results);
        this.setState({ "tableData": spatialData });
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
        this.props.props.setTableSettings({cards: cards});
    };
    
    setDefaultCards = () => {
        const cards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable}
        });
        this.setCards(cards)
    };

    // This is used for column ordering too.
    getColumns = () => {
        const { setSelectedImageDataset } = this.props.props;
        let columns = [
            {
                name: 'spectrackSampleId',
                title: 'Sample ID',
                sortable: true,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => <button onClick={() => setSelectedImageDataset(row)} type='button' data-toggle="popover" data-content="" className='table-column btn btn-link text-left p-0'>{row["spectracksampleid"]}</button>
            },
            {
                name: 'redcapid',
                title: 'Participant ID',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'datatype',
                title: 'Data Type',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'filename',
                title: 'Filename',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },            
            {
                name: 'imagetype',
                title: 'Image Type',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: this.getImageTypeCell
            },
            {
                name: 'level',
                title: 'Level',
                sortable: true,
                hideable: true,
                defaultHidden: true,
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

    getImageTypeCell = (row) => {
        return row["imagetype"] !== "" &&
            <div className={`image-type-cell ${(getImageTypeTooltipCopy(row["imagetype"]) !== "") ? 'clickable': '' }`}>
                <span className='mr-1'>{row["imagetype"]}</span>
                {getImageTypeTooltipCopy(row["imagetype"]) !== "" &&
                <div>
                    <div className='tooltip-parent-sibling'></div>
                    <div className='tooltip-parent rounded border shadow mt-2 p-2'>
                        <span className='tooltip-child'>{getImageTypeTooltipCopy(row["imagetype"])}</span>
                    </div>
                </div>
                }
            </div>
    };

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'spectrackSampleId', width: 145 },
            { columnName: 'datatype', width: 250 },
            { columnName: 'imagetype', width: 350 },
            { columnName: 'redcapid', width: 145 },
            { columnName: 'filename', width: 250 },
            { columnName: 'level', width: 100 },
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
            DATASET: 'DATASET',
            PARTICIPANT: 'PARTICIPANT',
        };

        const { pagingSize, columnWidths, hiddenColumnNames, sorting, currentPage} = this.props.props.tableSettings;

        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
                <Row>
                    <Col xl={3}>
                        <div className={`filter-panel-wrapper ${this.state.filterTabActive ? '': 'hidden'}`}>
                        <div className="filter-panel-tab-wrapper">
                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.DATASET)}}
                                className={`filter-tab ${this.props.activeFilterTab === tabEnum.DATASET ? 'active' : ''} rounded border`}>DATASET</div>
                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.PARTICIPANT)}}
                                className={`filter-tab ${this.props.activeFilterTab === tabEnum.PARTICIPANT ? 'active' : ''} rounded border`}>PARTICIPANT</div>
                            
                            <div className="filter-tab filter-tab-control-icon clickable"
                                 alt="Close Filter Tab"
                                 onClick={() => {this.toggleFilterTab()}}>                                
                                <FontAwesomeIcon
                                    className="fas fa-angles-left " icon={faAnglesLeft} />
                            </div>
                        </div>
                            <React.Fragment>
                            {this.props.activeFilterTab === tabEnum.DATASET &&
                            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                                <Row className="mb-2"><Col><Facet field="datatype" label="Experimental Strategy" filterType="any"
                                                                  view={MultiCheckboxFacet}/></Col></Row>
                                <Row className="mb-2"><Col><Facet field="imagetype" label="Image Type" filterType="any"
                                                                  view={MultiCheckboxFacet}/></Col></Row>
                            </Container>
                            }{this.props.activeFilterTab === tabEnum.PARTICIPANT &&
                        <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                            <Row className="mb-2"><Col><Facet field="sex" label="Sex" filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="age" label="Age" filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="tissuetype" label="Tissue Type"
                                                              filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet inputProps={{ placeholder: "cusaceholder" }} isFilterable={true}  field="redcapid" label="Participant ID"
                                                              filterType="any"
                                                              view={(props) => <MultiCheckboxFacet {...props} searchPlaceholder={"Search..."}/>}/></Col></Row>
                        </Container>
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
                            <div className='container-max spatial-data-table-wrapper'>
                                <div className="spatial-data-table">
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
                                                { columnName: 'spectrackSampleId', compare: compareTableStrings },
                                                { columnName: 'datatype',          compare: compareTableStrings },
                                                { columnName: 'filename',          compare: compareTableStrings },
                                                { columnName: 'imagetype',         compare: compareTableStrings },
                                                { columnName: 'redcapid',          compare: compareTableStrings }]}
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
                                            defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={145}
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

export default ImageDatasetList;
