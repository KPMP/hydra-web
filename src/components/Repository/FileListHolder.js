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
            <WithSearch mapContextToProps={({ filters, results, searchContext,setResultsPerPage,removeFilter}) =>
             ({filters, results, searchContext,setResultsPerPage,removeFilter})}>
                {(context) => {
                const { filters, results, searchContext, setResultsPerPage, removeFilter } = context;
                return (
                    <FileList
                        props={this.props}
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
