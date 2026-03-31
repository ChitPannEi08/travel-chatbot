import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ReviewDashboard from '../components/ReviewDashboard';

const ReviewPage = () => {
    const { t } = useLanguage();

    const handleTourSelect = (tour) => {
        console.log("Tour selected from dashboard:", tour);
        // Optionally redirect to tour booking page if needed
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <div style={{ paddingTop: '100px', paddingBottom: '50px', flex: 1 }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <h1 className="display-4 fw-bold mb-4 text-center" style={{ color: '#2E3D5D' }}>
                                Reviews & Feedback
                            </h1>
                            <p className="lead text-muted text-center mb-5">
                                See what our travelers are saying about our tours and guides.
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <ReviewDashboard onTourSelect={handleTourSelect} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewPage;