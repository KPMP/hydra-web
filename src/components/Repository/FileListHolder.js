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
        this.setState({filterTabActive: !this.state.filterTabActive})
    };

    render() {
        return (
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
