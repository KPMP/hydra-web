import React, { Component } from 'react';
import FileList from "./FileList";

import { WithSearch } from "@elastic/react-search-ui";
import { PagingInfo } from "@elastic/react-search-ui";


class FileListHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterTab: 'PARTICIPANT',
            filterTabActive: true
        };

    }

    setActiveFilterTab = (tabName) => {
        this.setState({activeFilterTab: tabName});
    };
    
    toggleFilterTab = () => {
        if(this.state.filterTabActive) {
            this.setState({filterTabActive: false});
        } else {
            this.setState({filterTabActive: true});
        }
    };

    render() {
        return (
            <WithSearch mapContextToProps={({ filters, results, searchContext, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort }) =>
             ({ filters, results, searchContext, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort })}>
                {(context) => {
                const { filters, results, searchContext, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort } = context;
                return (
                    <FileList
                        props={this.props}
                        setSort={setSort}
                        totalResults={totalResults}
                        filters={filters}
                        results={results}
                        searchContext={searchContext}
                        setResultsPerPage={setResultsPerPage}
                        removeFilter={removeFilter}
                        clearFilters={clearFilters}
                        setActiveFilterTab={this.setActiveFilterTab}
                        activeFilterTab={this.state.activeFilterTab}
                        filterTabActive={this.state.filterTabActive}
                        toggleFilterTab={this.toggleFilterTab}
                    />
                )}}
                </WithSearch>
        )
    }
}

export default FileListHolder;
