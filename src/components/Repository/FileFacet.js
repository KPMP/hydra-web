import React, { Component } from 'react';
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";
import {  Col, Container, Row } from "reactstrap";

class FileFacet extends Component {

    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
            <Row className="mb-2">
                <Col>
                    <Facet field="data_category" label="Data Category" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="data_type" label="Data Type" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="experimental_strategy" label="Experimental Strategy" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="workflow_type" label="Workflow Type" filterType="any" view={MultiCheckboxFacet}
                    mapContextToProps={(context) => {
                        console.log(context)
                        if (!context.facets.states) return context;
                        return {
                            ...context,
                            facets: {
                                ...(context.facets || {}),
                                states: context.facets.states.map((s) => ({
                                    ...s,
                                    data: () => {
                                        return s.value == '' ? 'EMPTY': s.value
                                    }
                                         
                                }))

                                
                            }
                        }
                    }}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="data_type" label="Data Format" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="platform" label="Platform" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="access" label="Access" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <Facet field="dois" label="DOIs" filterType="any" view={MultiCheckboxFacet}/>
                </Col>
            </Row>
        </Container>
        )
    }
}
export default FileFacet;