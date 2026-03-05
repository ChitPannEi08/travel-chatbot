import { useState } from "react";
import { Card, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EmergencyWidget() {
    return (
        <Card>
            <Card.Header style={{ backgroundColor: '#bf1212ff', color: '#fff' }}>
                <Card.Title className="fw-bold text-center">Emergency Contacts</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row style={{ paddingBottom: '20px' }}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title className="fw-bold text-center" style={{ color: "#2E3D5D" }}>Police & Emergencies</Card.Title>
                            </Card.Header>
                            <Card.Body className="fw-bold text-center">
                                <a href="tel:191" style={{ textDecoration: 'none' }}>191</a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title className="fw-bold text-center" style={{ color: "#2E3D5D" }}>Tourist Police</Card.Title>
                            </Card.Header>
                            <Card.Body className="fw-bold text-center">
                                <a href="tel:1155" style={{ textDecoration: 'none' }}>1155</a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title className="fw-bold text-center" style={{ color: "#2E3D5D" }}>Highway Police</Card.Title>
                            </Card.Header>
                            <Card.Body className="fw-bold text-center">
                                <a href="tel:1193" style={{ textDecoration: 'none' }}>1193</a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title className="fw-bold text-center" style={{ color: "#2E3D5D" }}>Ambulance</Card.Title>
                            </Card.Header>
                            <Card.Body className="fw-bold text-center">
                                <a href="tel:1669" style={{ textDecoration: 'none' }}>1669</a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}