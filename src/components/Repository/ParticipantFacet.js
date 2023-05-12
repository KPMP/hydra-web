import React, {Component} from 'react';
import {  Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

class ParticipantFacet extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                <UncontrolledAccordion
                    defaultOpen={[
                        '1',
                        '2'
                    ]}
                    stayOpen
                >
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            Sex
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                <Row className='mb-2'>
                    <Col>
                        <Facet field='sex' label='' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Accordion Item 1
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                <Row className='mb-2'>
                    <Col>
                        <Facet field='age_binned' label='Age' filterType='any' view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                        </AccordionBody>
                    </AccordionItem>
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
                        
                </UncontrolledAccordion>
            </Container>
        )
    }
}

export default ParticipantFacet;