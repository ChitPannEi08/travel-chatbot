import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PhrasesWidget from '../components/PhrasesWidget';
import TripWidget from '../components/TripWidget';
import { useLanguage } from "../context/LanguageContext";

const Tour = () => {
    const { t } = useLanguage();
    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <NavBar />
            <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <h1 className="display-4 fw-bold mb-4 text-center" style={{ color: '#2E3D5D' }}>
                                {t('tour_title')}
                            </h1>
                            <p className="lead text-muted text-center mb-5">
                                {t('tour_subtitle')}
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={10} lg={6} className="mb-4">
                            <Card style={{
                                backgroundColor: '#2E3D5D',
                                borderRadius: '30px',
                                border: 'none',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '20px'
                            }}>
                                <TripWidget />
                            </Card>
                        </Col>
                        <Col md={10} lg={6} className="mb-4">
                            <PhrasesWidget />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Tour;
