import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, Col, Container, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from "reactstrap";
import { resultConverter } from "../../helpers/dataHelper";
import { faXmark, faAnglesRight, faAnglesLeft, faDownload, faUnlock, faUnlockKeyhole, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from 'pretty-bytes';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import copy from 'copy-to-clipboard';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

import {
    SortingState,
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

import AllFacets from './AllFacets.js';
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import Api from '../../helpers/Api';
import { fetchAtlasTotalFileCount } from '../../helpers/Api.js';

let fileDownloadEndpoint = "https://" + window.location.hostname + "/api/v1/file/download"
if (process.env.REACT_APP_FILE_ENDPOINT) {
    fileDownloadEndpoint = process.env.REACT_APP_FILE_ENDPOINT
}

class FileList extends Component {

    constructor(props) {
        super(props);
        const columnCards = this.getColumns().slice(1).map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable, isSortField: item?.isSortField}
            
        });
        const defaultHiddenColumns = this.getDefaultHiddenColumnNames(this.getColumns())
        this.state = {
            accessAlertModal: false,
            activeFilterTab: 'FILE',
            tableData: [],
            resultCount: 0,
            cards: this.props.props.tableSettings.cards || columnCards,
            isLoaded: false,
            hiddenColumnNames: this.props.props.tableSettings.hiddenColumns || defaultHiddenColumns,
            reportIsLoading: false
        };

    }

    async getSearchResults () {
        let data = resultConverter(this.props.results);
        // If we have 10K results and no filters, get the total file count
        if (this.props.totalResults === 10000 && this.props.filters.length === 0) {
            const summary = await fetchAtlasTotalFileCount();
            this.setState({tableData: data, resultCount: summary.totalFiles});
        } else {
            this.setState({ tableData: data, resultCount: this.props.totalResults });
        }
        
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
                this.props.setCurrent(1);
            }
        }
    };

    setCards = (cards) => {
        this.setState({cards});
    };

    setShowHide = (hiddenColumnNames) => {
        this.setState({hiddenColumnNames: hiddenColumnNames});
    }
    
    setDefaultCards = () => {
        const cards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable, isSortField: item?.isSortField}
        });
        this.setCards(cards.slice(1))
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

    getAllResults = async () => {
        let filterMap = [];
        // eslint-disable-next-line array-callback-return
        this.props.filters.map((filter) => {
            let obj = {};
            obj[filter["field"]] = filter["values"];
            filterMap.push(obj);
        });
        let sortMap = [];
        if (this.props.props.tableSettings.sorting) {
            // eslint-disable-next-line array-callback-return
            this.props.props.tableSettings.sorting.map((sortItem) => {
                let obj = {};
                obj[sortItem["columnName"]] = sortItem["direction"];
                sortMap.push(obj);
            })
        }
        var allRecords = [];
        let totalPages = Math.ceil(this.props.totalResults / 1000);
        for (let i = 1; i <= totalPages; i++) {
            let config = {
                "query":"",
                "page": {
                    "size": 1000,
                    "current": i
                },
                "filters": {
                    "all": filterMap
                }
            }
            if (sortMap.length > 0){
                config["sort"] = sortMap
            }
            await Api.getInstance().post(
                process.env.REACT_APP_SEARCH_ENDPOINT + "/api/as/v1/engines/atlas-repository/search.json", 
                config, 
                { 
                    headers: {
                        "Authorization" : `Bearer ${process.env.REACT_APP_SEARCH_KEY}`
                    }
                }).then((response) => {
                    response.data.results.forEach((res) => {
                        res = Object.keys(res)
                        .reduce((obj, key) => {
                            obj[key] = res[key]['raw'];
                            return obj;
                        }, {})
                        allRecords.push(res)
                    })
                })
        }
        return allRecords;
    }

    cleanResults = async () => {
        return await this.getAllResults().then((res) => {
            var results = res;
            let cols = {};
            this.getColumns()
                .filter((column) => {
                    return !this.state.hiddenColumnNames.includes(column.name);
                })
                .forEach((column) => {
                    cols[column.name] = column.title;
                })
            cols["package_id"] = "Internal Package ID";
            
            results.forEach((res, index) => {
                
                // CSV output discards null columns, so replace the null cell values with empty strings
                res = {...res, 
                    dois: res['dois'] ? res['dois'].toString() : "",
                    workflow_type: res['workflow_type'] ? res['workflow_type'].toString() : "",
                    platform: res['platform'] ? res['platform'].toString() : "",
                    experimental_strategy: res["experimental_strategy"] ? res["experimental_strategy"].toString() : "",
                    file_size: prettyBytes(parseInt(res["file_size"]))
                };
                
                results[index] = Object.keys(res)
                .filter((key) => {
                    return cols.hasOwnProperty(key)
                })
                .reduce((obj, key) => {
                    obj[cols[key]] = res[key];
                    return obj;
                }, {});
            });
            return results;
        });
    };

    copyFileName(fileName) {
        copy(fileName);
    }

    // This is used for column ordering too.
    getColumns = () => {
        const { setParticipantReport } = this.props.props;
        let columns = [
            {
                name: 'download',
                title: 'download',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => { return <span onClick={(e) => {
                    row['access'] === 'controlled' ?
                        this.toggleAccessAlertModal() : 
                        this.downloadFile(`${fileDownloadEndpoint}/${row['package_id']}/${row['file_name']}`, row['file_name'])
                }} className="clickable download-btn">
                    <FontAwesomeIcon
                        className="fas" icon={faDownload} />
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
                    className="fas" icon={row['access'] === 'controlled' ? faUnlock: faUnlockKeyhole } /> {row['access']}</span> }
            },  
            {
                name: 'redcap_id',
                title: 'Participant ID',
                sortable: true,
                hideable: true,
                defaultHidden: false, 
                getCellValue: row => { 
                    return row['redcap_id'] !== "Multiple Participants" 
                    ? <button onClick={async (e) => {
                            this.setState({reportIsLoading: true});
                            await setParticipantReport(row['redcap_id'][0]).then(() => {
                                this.setState({reportIsLoading: false});
                                this.props.props.history.push('/report?id=' + row['redcap_id']); 
                            })
                        }} type='button' data-toggle="tooltip" data-placement="top" title="View participant information" className='table-column btn btn-link p-0'>{row["redcap_id"]}</button>
                    : row["redcap_id"]
                } 
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
                getCellValue: row => { return <span data-tooltip-id='copy' data-tooltip-content='Copied' onClick={() => this.copyFileName(row['file_name'])}>
                    <FontAwesomeIcon icon={faCopy}/> {row['file_name'].slice(37)}<span id='tooltip'><Tooltip id='copy' openOnClick='true' place='left'/></span></span>}
            },
            {
                name: 'data_category',
                title: 'Data Category',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'workflow_type',
                title: 'Workflow Type',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: row => { return (row['workflow_type'] ? (row['workflow_type'].length > 1 ? row['workflow_type'].join(", ") : row['workflow_type']) : '--') }
            },
            {
                name: 'file_size',
                title: 'Size',
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
                getCellValue: row => { return (row['experimental_strategy'] ? (row['experimental_strategy'].length > 1 ? row['experimental_strategy'].join(", ") : row['experimental_strategy']) : '--') }
            },  
            {
                name: 'platform',
                title: 'Platform',
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
                getCellValue: row => { return (row['dois'] ? (row['dois'].length > 1 ? row['dois'].join(", ") : row['dois']) : '') }
            },
            // Sort columns
            {
                name: 'participant_id_sort', 
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'file_name_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'platform_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'experimental_strategy_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'doi_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            }
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
            { columnName: 'file_name', width: 400 },
            { columnName: 'data_category', width: 151 },
            { columnName: 'workflow_type', width: 200 },
            { columnName: 'platform', width: 200 },
            { columnName: 'file_size', width: 74 },
            { columnName: 'file_id', width: 200 },
            { columnName: 'data_type', width: 200 },
            { columnName: 'dois', width: 200 },
            { columnName: 'experimental_strategy', width: 210 },
            { columnName: 'file_name_sort', width: 0 },
            { columnName: 'participant_id_sort', width: 0 },
            { columnName: 'platform_sort', width: 0 },
            { columnName: 'experimental_strategy_sort', width: 0 },
            { columnName: 'doi_sort', width: 0 },
        ]
    };
  
    getPageSizes = () => {
        return [10,20,40,80,100]
    };

    getFilterPills = (filters) => {
        const filterDisplayNames = {
            participant: "Participant",
            sample_type: "Sample Type",
            data_format: "Data Format",
            access: "Access",
            redcap_id: "Participant ID",
            file_name: "File Name",
            data_category: "Data Category",
            workflow_type: "Workflow Type",
            platform: "Platform",
            file_size: "File Size",
            file_id: "File ID",
            data_type: "Data Type",
            dois: "DOIs",
            experimental_strategy: "Experimental Strategy",
            sex: "Sex",
            age_binned: "Age",
            enrollment_category: "Enrollment Category",
            tissue_source: "Tissue Source",
            protocol: "Protocol",
            release_version: "Release Version",
            race: "Race",
            proteinuria: "Proteinuria",
            hypertension_history: "Hypertension History",
            hypertension_duration: "Hypertension Duration",
            on_raas_blockade: "RAAS Blockade",
            diabetes_duration: "Diabetes Duration",
            diabetes_history: "Diabetes History",
            kdigo_stage: "KDIGO Stage",
            a1c: "A1c",
            albuminuria: "Albuminuria",
            baseline_egfr: "Baseline eGFR",
            primary_adjudicated_category: "Primary Adjudicated Category"
        };
    
        return filters.map(filter => {
            return filter.values.map(value => {
                const sanitizedId = `${filter.field.toString()}-${value.toString()}`.replace(/[^a-zA-Z0-9-_]/g, '_');
                return (
                    <div
                        key={sanitizedId}
                        className="border rounded activeFilter"
                        id={sanitizedId}
                    >
                        <span>{value}
                            <UncontrolledTooltip placement="bottom" target={sanitizedId}>
                                {filterDisplayNames[filter.field] || filter.field}
                            </UncontrolledTooltip>
                            <FontAwesomeIcon
                                alt="Close Filter"
                                onClick={() => {
                                    this.props.removeFilter(filter.field, value);
                                }}
                                className="close-button fas fa-xmark ms-2"
                                icon={faXmark}
                            />
                        </span>
                    </div>
                );
            });
        });
    };
    
    

    getTotalPages = () => {
        let val = Math.ceil(this.props.totalResults / this.props.resultsPerPage);
        return (val > 100) ? 100 : val;
    };

    render() {
      
        const { columnWidths, sorting } = this.props.props.tableSettings;

        return (
            <div className='height-wrapper'>
            <Container id='outer-wrapper' className="multi-container-container container-xxl mh-100">
                { this.state.reportIsLoading === true &&
                    <div className='spinner-container'>
                        <Spinner className='report-spinner'>
                                Loading
                        </Spinner>
                    </div>
                }
                <Row>
                    <Col xl={3} className={`filter-panel-wrapper ${this.props.filterTabActive ? '': 'hidden'}`}>
                        <div className={`filter-panel-wrapper ${this.props.filterTabActive ? '': 'hidden'}`}>
                            <div className="filter-panel-tab-wrapper">
                                
                                <div className="filter-tab filter-tab-control-icon clickable"
                                    alt="Close Filter Tab"
                                    onClick={() => {this.props.toggleFilterTab()}}>                                
                                    <FontAwesomeIcon
                                        className="fas fa-angles-left " icon={faAnglesLeft} />
                                </div>
                            </div>
                            {this.accessAlertModal()}
                            
                            <AllFacets/>
                            
                        </div>

                        </Col>
                        <Col xl={`${this.props.filterTabActive ? 9 : 12 }`}>
                            <Row>
                                <Col 
                                    className={`filter-collapse clickable ${this.props.filterTabActive ? 'hidden': ''}`}
                                    xl={1}
                                    alt="Open Filter Tab"
                                    onClick={() => {this.props.toggleFilterTab()}}>
                                <FontAwesomeIcon
                                        className="fas fa-angles-right" icon={faAnglesRight} />
                                </Col>
                                <Col xl={12} className={`my-0 activeFilter-column ${this.props.filterTabActive ? 'closed': ''}`}>
                                    {this.props.filters.length === 0 ?

                                    <Row className="filter-pill-row inactive-filters">
                                        <span><FontAwesomeIcon icon={faLongArrowLeft}/> Start searching by selecting a facet</span>
                                    </Row>
                                    :
                                    <Row className="filter-pill-row">
                                        <div className="border rounded activeFilter action-button">
                                            <span 
                                                onClick={()=>{
                                                    this.props.clearFilters()
                                                    this.props.clearSearch()
                                                }}>
                                                    <FontAwesomeIcon alt="Clear All Filters" className="fa-light fa-trash-can" icon={faTrashCan} /> Clear Filters 
                                            </span>
                                        </div>

                                        {this.getFilterPills(this.props.filters)}
                                    </Row>}
                                    
                                </Col>
                            </Row>
                            <DndProvider backend={HTML5Backend}>
                                <div className='container-max data-table-wrapper'>
                                    <div className="data-table">
                                        <p>
                                            <div id="empty-space-wrapper">
                                                <div id="empty-space">
                                                </div>
                                            </div>
                                            <strong>IMPORTANT: Please follow this <a href="https://www.kpmp.org/help-docs/study-overview?tabname=citingkpmpdata" target="_blank" rel="noreferrer">citation guideline</a> when presenting or publishing KPMP data.</strong>
                                        </p>
                                        <React.Fragment>
                                        { this.state.isLoaded ?
                                        <Grid
                                            rows={this.state.tableData}
                                            columns={this.getColumns()}>
                                            <SortingState
                                                defaultSorting={[]}
                                                onSortingChange={(sorting) => {
                                                    let sortOptions = sorting.map(val => {
                                                        if (val.columnName === "redcap_id") {
                                                            return { field: "participant_id_sort", direction: val.direction }
                                                        }
                                                        else if (val.columnName === "file_name") {
                                                            return { field: "file_name_sort", direction: val.direction }
                                                        }
                                                        else if (val.columnName === "platform") {
                                                            return { field: "platform_sort", direction: val.direction }
                                                        }
                                                        else if (val.columnName === "experimental_strategy") {
                                                            return { field: "experimental_strategy_sort", direction: val.direction }
                                                        }
                                                        else if (val.columnName === "dois") {
                                                            return { field: "doi_sort", direction: val.direction }
                                                        }
                                                        else {
                                                            return { field: val.columnName, direction: val.direction }
                                                        }
                                                    })
                                                    this.props.setSort(sortOptions);
                                                    this.props.props.setTableSettings({sorting: sorting});
                                                    this.props.setCurrent(1);
                                                }
                                                }
                                                sorting={sorting}/>
                                            <DataTypeProvider
                                                for = {["file_size"]}
                                                formatterComponent = {({value}) => <span>{prettyBytes(parseInt(value))}</span>}
                                            />
                                           <PagingState
                                            currentPage={this.props.currentPage-1}
                                            pageSize={this.props.resultsPerPage}
                                            />
                                            <PagingPanel
                                            pageSizes={this.getPageSizes()}
                                            containerComponent={() => {
                                                return (
                                                <PagingPanel.Container
                                                    totalPages={this.getTotalPages()}
                                                    currentPage={this.props.currentPage-1}
                                                    onCurrentPageChange={(page) => {
                                                        // dx-react-grid paging starts at 0, while ElasticSearch starts at 1
                                                        // (hence the "+1" and "-1")
                                                        this.props.setCurrent(page+1);
                                                    }}
                                                    pageSize={this.props.resultsPerPage}
                                                    totalCount={this.state.resultCount}
                                                    onPageSizeChange={(pageSize) => {
                                                        this.props.setResultsPerPage(pageSize);
                                                    }}
                                                    pageSizes={this.getPageSizes()}
                                                    getMessage={(messageKey) => {return messageKey}}
                                                />
                                                )}}
                                            />
                                            <Toolbar
                                                cards={this.state.cards}
                                                setCards={this.state.setCards}
                                            />
                                            <ToolbarButtonState setTableSettings={this.props.props.setTableSettings} order={this.state.cards} hidden={this.state.hiddenColumnNames} />
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
                                                hiddenColumnNames={this.state.hiddenColumnNames}
                                                onHiddenColumnNamesChange={(hiddenColumnNames) => {this.setShowHide(hiddenColumnNames)}}
                                            />
                                            <ColumnChooser />
                                                    
                                            <ToolbarButton
                                                resultCount={this.state.resultCount}
                                                cards={this.state.cards}
                                                setCards={this.setCards}
                                                setDefaultCards={this.setDefaultCards}
                                                defaultOrder={this.getColumns().map(item => item.name)}
                                                cleanResults={this.cleanResults}
                                                />
                                            <PaginationState
                                                setResultsPerPage={this.props.setResultsPerPage}
                                                pagingSize={this.props.resultsPerPage}/>
                                            <Pagination pageSizes={this.getPageSizes()} />
                                    </Grid>
                                    : <Spinner animation="border" variant="primary">
                                            Loading...
                                        </Spinner> }
                                        </React.Fragment>
                                </div>
                            </div>
                        </DndProvider>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default FileList;
