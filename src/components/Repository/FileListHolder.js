import React, { Component } from 'react';
import FileList from "./FileList";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

const connector = new AppSearchAPIConnector({
    searchKey: process.env.REACT_APP_SEARCH_KEY,
    endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT,
    engineName: "atlas-repository",
    cacheResponses: false
  })
  
  const searchConfig = {
    apiConnector: connector,
    searchQuery: {
        disjunctiveFacets: [
          "id",
          "data_format",
          "access",
          "redcap_id",
          "file_name",
          "data_category",
          "workflow_type",
          "package_id",
          "platform",
          "file_size",
          "file_id",
          "data_type",
          "dois",
          "experimental_strategy",
          "sex",
          "age_binned",
          "enrollment_category",
          "sample_type",
          "tissue_source",
          "protocol",
          "release_version",
          "ethnicity",
          "proteinuria",
          "hypertension_history",
          "hypertension_duration",
          "on_raas_blockade",
          "diabetes_duration",
          "diabetes_history",
          "kdigo_stage",
          "a1c",
          "albuminuria",
          "baseline_egfr",
          "primary_adjudicated_category"
        ],
        facets: {
          id: { type: "value", size: 500},
          data_format: { type: "value", size: 250},
          access: { type: "value", size: 250},
          redcap_id: { type: "value", size: 500},
          file_name: { type: "value", size: 250},
          data_category: { type: "value", size: 250},
          workflow_type: { type: "value", size: 250},
          package_id: { type: "value", size: 250},
          platform: { type: "value", size: 250},
          file_size: { type: "value", size: 250},
          file_id: { type: "value", size: 250},
          data_type: { type: "value", size: 250},
          dois: { type: "value", size: 250},
          experimental_strategy: { type: "value", size: 250},
          sex: { type: "value", size: 250},
          age_binned: { type: "value", size: 250},
          enrollment_category: { type: "value", size:250},
          sample_type: { type: "value", size: 250},
          tissue_source: { type: "value", size: 250},
          protocol: { type: "value", size: 250},
          release_version: { type: "value", size: 250},
          ethnicity: {type: "value", size: 250},
          proteinuria: {type: "value", size: 250},
          hypertension_history: {type: "value", size: 250},
          hypertension_duration: {type: "value", size: 250},
          on_raas_blockade:{type: "value", size: 250},
          diabetes_duration: {type: "value", size: 250},
          diabetes_history: {type: "value", size: 250},
          kdigo_stage: {type: "value", size: 250},
          a1c: {type: "value", size: 250},
          albuminuria: {type: "value", size: 250},
          baseline_egfr: {type: "value", size: 250},
          primary_adjudicated_category: {type: "value", size: 250},
        }
    },
    initialState: {
      resultsPerPage: 20,
      current: 1
    },
    trackUrlState: true,
    alwaysSearchOnInitialLoad: true
  }
class FileListHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterTab: 'PARTICIPANT',
            filterTabActive: true,
            search: ""
        };

    }

    clearSearch = () => {
        this.setState({search: null})
    }

    setActiveFilterTab = (tabName) => {
        this.setState({activeFilterTab: tabName});
    };
    
    toggleFilterTab = () => {
        this.setState({filterTabActive: !this.state.filterTabActive})
    };

    render() {
        return (
            <SearchProvider config={searchConfig}>
                <WithSearch mapContextToProps={({ filters, current, setCurrent, results, resultsPerPage, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort }) =>
                 ({ filters, results, current, setCurrent, resultsPerPage, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort })}>
                    {(context) => {
                    const { filters, results, current, setCurrent, resultsPerPage, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort } = context;
                    return (
                        <FileList
                            props={this.props}
                            currentPage={current}
                            setCurrent={setCurrent}
                            setSort={setSort}
                            totalResults={totalResults}
                            filters={filters}
                            results={results}
                            resultsPerPage={resultsPerPage}
                            setResultsPerPage={setResultsPerPage}
                            removeFilter={removeFilter}
                            clearFilters={clearFilters}
                            clearSearch={this.clearSearch}
                            setActiveFilterTab={this.setActiveFilterTab}
                            activeFilterTab={this.state.activeFilterTab}
                            filterTabActive={this.state.filterTabActive}
                            toggleFilterTab={this.toggleFilterTab}
                        />
                    )}}
                </WithSearch>
            </SearchProvider>
        )
    }
}

export default FileListHolder;
