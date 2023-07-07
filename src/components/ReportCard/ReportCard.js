import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

class ReportCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row className="header u-gutter-fix">
                    <Col className="pt-1 pb-1">
                        <span>Participant Information</span>
                    </Col>
                </Row>
                <Row>
                    <Col className='p-4'>Information coming soon...</Col>
                </Row>
            </div>
        )
    }
}

export default ReportCard;