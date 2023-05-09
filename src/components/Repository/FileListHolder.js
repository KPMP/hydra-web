import React, { Component } from 'react';
import FileList from "./FileList";

import { WithSearch } from "@elastic/react-search-ui";
import { PagingInfo } from "@elastic/react-search-ui";


class FileListHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterTab: 'PARTICIPANT',
        };

    }

    setActiveFilterTab = (tabName) => {
        this.setState({activeFilterTab: tabName});
    };
    render() {
        return (
            <WithSearch mapContextToProps={({ totalResults, filters, results, searchContext,setResultsPerPage,removeFilter}) =>
             ({filters, results, searchContext,setResultsPerPage,removeFilter,totalResults})}>
                {(context) => {
                const { filters, results, searchContext, setResultsPerPage, removeFilter, totalResults } = context;
                return (
                    <FileList
                        props={this.props}
                        totalResults={totalResults}
                        filters={filters}
                        results={results}
                        searchContext={searchContext}
                        setResultsPerPage={setResultsPerPage}
                        removeFilter={removeFilter}
                        setActiveFilterTab={this.setActiveFilterTab}
                        activeFilterTab={this.state.activeFilterTab}
                    />
                )}}
                </WithSearch>
        )
    }
}

export default FileListHolder;
