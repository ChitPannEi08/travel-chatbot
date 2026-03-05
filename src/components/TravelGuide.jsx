import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

export const VisaChecker = () => {
    const [nationality, setNationality] = useState("");
    const [days, setDays] = useState(60);
    const [result, setResult] = useState(null);

    const visaFreeCountries = [
        "Andorra", "Australia", "Austria", "Belgium", "Bahrain", "Brazil", "Brunei", "Canada",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
        "Hungary", "Iceland", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kuwait",
        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Maldives",
        "Mauritius", "Monaco", "Netherlands", "New Zealand", "Norway", "Oman", "Philippines",
        "Poland", "Portugal", "Qatar", "San Marino", "Singapore", "Slovakia", "Slovenia",
        "Spain", "South Africa", "South Korea", "Sweden", "Switzerland", "Turkey", "Ukraine",
        "United Arab Emirates", "United Kingdom", "UK", "United States", "USA", "America", "Peru", "Hong Kong",
        "Vietnam", "Saudi Arabia", "Bhutan", "Bulgaria", "Cyprus", "Fiji", "Georgia", "India",
        "Kazakhstan", "Malta", "Mexico", "Papua New Guinea", "Romania", "Uzbekistan", "Taiwan",
        "China", "Laos", "Macau", "Mongolia", "Russia", "Cambodia", "Albania", "Colombia",
        "Croatia", "Cuba", "Dominica", "Dominican Republic", "Ecuador", "Guatemala", "Jamaica",
        "Jordan", "Kosovo", "Morocco", "Panama", "Sri Lanka", "Trinidad and Tobago", "Tonga", "Uruguay"
    ];

    const checkVisa = () => {
        const trimmedNationality = nationality.trim();
        if (!trimmedNationality) {
            setResult({ type: "warning", message: "Please enter your country." });
            return;
        }

        const isVisaFree = visaFreeCountries.some(
            (country) => country.toLowerCase() === trimmedNationality.toLowerCase()
        );

        if (isVisaFree) {
            if (parseInt(days) <= 60) {
                setResult({
                    type: "success",
                    message: "✅ You can enter Thailand visa-free for up to 60 days!"
                });
            } else {
                setResult({
                    type: "danger",
                    message: "❌ Visa Required. Even for visa-exempt nationalities, a visa must be applied for stays exceeding 60 days."
                });
            }
        } else {
            if (parseInt(days) <= 14) {
                setResult({
                    type: "info",
                    message: "✅ Your nationality is eligible for a free tourist visa (VoA) for up to 14 days!"
                });
            } else {
                setResult({
                    type: "danger",
                    message: "❌ Visa Required. For stays longer than 14 days, travelers from your country must apply for a visa."
                });
            }
        }
    };

    return (
        <Card className="shadow border-0" style={{ backgroundColor: '#2E3D5D', color: '#fff', borderRadius: '20px' }}>
            <Card.Body className="p-4">
                <h4 className="fw-bold mb-4 text-center">Thailand Tourist Visa Checker</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type Your Country"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stay Duration (Days)</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                        />
                    </Form.Group>

                    <Button
                        variant="light"
                        className="w-100 fw-bold py-2 mb-3"
                        onClick={checkVisa}
                        style={{ borderRadius: '10px', color: '#2E3D5D' }}
                    >
                        Check
                    </Button>
                </Form>

                {result && (
                    <div className={`mt-3 p-3 rounded text-center bg-${result.type}`} style={{ opacity: 0.9 }}>
                        {result.message}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export const MandatoryDocuments = () => {
    return (
        <Card className="shadow border-0" style={{ backgroundColor: '#2E3D5D', color: '#fff', borderRadius: '20px' }}>
            <Card.Body className="p-4">
                <h4 className="fw-bold mb-4 text-center">Mandatory Documents</h4>
                <ListGroup variant="flush" style={{ paddingBottom: '20px' }}>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Passport valid for at least 6 months.
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Tourist visa depending on your nationality and length of stay.
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Digital Arrival Card (Form TM.6).
                        <a href="https://tdac.immigration.go.th/arrival-card/#/home" target="_blank" rel="noopener noreferrer"> Click here to fill in advance.</a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Proof of accomodation booking and return travel tickets.
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Proof of sufficient amount of money.
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};