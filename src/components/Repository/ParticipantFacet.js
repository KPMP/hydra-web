import React, {Component} from 'react';
import {  Col, Container, Row } from "reactstrap";
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

class ParticipantFacet extends Component {

    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                        
                {/* <Row className="mb-2">
                    <Col>
                        <Facet field="cases.age" label="Age" filterType="any"view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Facet field="tissuetype" label="Tissue Type" filterType="any" view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Facet inputProps={{ placeholder: "placeholder" }}
                            isFilterable={true} field="redcapid"
                            label="Participant ID"
                            filterType="any"
                            view={(props) => <MultiCheckboxFacet {...props}
                            searchPlaceholder={"Search..."}/>}/>
                    </Col>
                </Row> */}
            </Container>
        )
    }
}

export default ParticipantFacet;