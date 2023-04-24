import React, {Component} from 'react';
import {  Col, Container, Row } from "reactstrap";
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

class ParticipantFacet extends Component {

    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                <Row className='mb-2'>
                    <Col>
                        <Facet field='sex' label='Sex' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Facet field='age_binned' label='Age' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Facet field='tissue_type' label='Tissue Type' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Facet field='sample_type' label='Sample Type' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>                
                <Row className='mb-2'>
                    <Col>
                        <Facet inputProps={{ placeholder: "placeholder" }}
                            isFilterable={true} field="redcap_id"
                            label="Participant ID"
                            filterType="any"
                            view={(props) => <MultiCheckboxFacet {...props}
                            searchPlaceholder={"Search..."}/>}/>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Facet field='tissue_source' label='Tissue Source' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>      
                <Row className='mb-2'>
                    <Col>
                        <Facet field='protocol' label='Protocol' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>                          
                        
                
            </Container>
        )
    }
}

export default ParticipantFacet;