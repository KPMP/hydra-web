import React, { Component } from 'react';
import ImageDatasetList from "./ImageDatasetList";

import { WithSearch } from "@elastic/react-search-ui";

class ImageDatasetListSubContainer extends Component {
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
                    <ImageDatasetList
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

export default ImageDatasetListSubContainer;
