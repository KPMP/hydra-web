import React, {Component} from 'react';
import {Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from "reactstrap";
import {Facet} from "@elastic/react-search-ui";
import {MultiCheckboxFacet} from "@elastic/react-search-ui-views";

class ParticipantFacet extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                <Row className="mb-2">
                    <Col id="release">
                        <Facet field="release_version" label="" filterType="any" view={MultiCheckboxFacet}/>
                    </Col>
                </Row>
                <UncontrolledAccordion
                    defaultOpen={['1', '2', '3', '4', '5', '6', '7']}
                    stayOpen
                >
                  <AccordionItem>
                <AccordionHeader targetId="5">
                    Participant ID
                </AccordionHeader>
                <AccordionBody accordionId="5">
                    <Row className='mb-2'>
                        <Col>
                            <Facet inputProps={{placeholder: "placeholder"}}
                                   isFilterable={true} field="redcap_id"
                                   label=""
                                   filterType="any"
                                   view={(props) => <MultiCheckboxFacet {...props}
                                                                        searchPlaceholder={"Search..."}/>}/>
                        </Col>
                    </Row>
                </AccordionBody></AccordionItem>
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
                            Age
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet field='age_binned' label='' filterType='any' view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Enrollment Category
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet field='tissue_type' label='' filterType='any' view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="4">
                            Sample Type
                        </AccordionHeader>
                        <AccordionBody accordionId="4">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet field='sample_type' label='' filterType='any' view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="6">
                            Tissue Source
                        </AccordionHeader>
                        <AccordionBody accordionId="6">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet field='tissue_source' label='' filterType='any' view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="7">
                            Protocol
                        </AccordionHeader>
                        <AccordionBody accordionId="7">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet field='protocol' label='' filterType='any' view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>

                </UncontrolledAccordion>
                <UncontrolledAccordion
                    defaultOpen={['1', '2', '3', '4', '5', '6', '7', '8']}
                    stayOpen
                >
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            Data Category
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="data_category" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Data Type
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="data_type" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Experimental Strategy
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="experimental_strategy" label="" filterType="any"
                                           view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="4">
                            Workflow Type
                        </AccordionHeader>
                        <AccordionBody accordionId="4">
                            <Row className="mb-2">
                                <Col>
                                    <Facet inputProps={{placeholder: "placeholder"}}
                                           isFilterable={true} field="workflow_type"
                                           label=""
                                           filterType="any"
                                           view={(props) => <MultiCheckboxFacet {...props}
                                                                                searchPlaceholder={"Search..."}/>}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="5">
                            Data Format
                        </AccordionHeader>
                        <AccordionBody accordionId="5">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="data_format" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="6">
                            Platform
                        </AccordionHeader>
                        <AccordionBody accordionId="6">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="platform" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="7">
                            Access
                        </AccordionHeader>
                        <AccordionBody accordionId="7">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="access" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="8">
                            DOIs
                        </AccordionHeader>
                        <AccordionBody accordionId="8">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="dois" label="" filterType="any" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody></AccordionItem>
                </UncontrolledAccordion>
            </Container>
        )
    }
}

export default ParticipantFacet;