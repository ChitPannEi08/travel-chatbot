import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: '#2E3D5D', padding: '12px 0 0' }}>
            <Container>
                <Row className="align-items-start">
                    <Col md={2}>
                        <h6 className="fw-bold mb-2" style={{ color: 'var(--color-primary)' }}>Site Map</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.85rem' }}>
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/chat" className="text-white text-decoration-none">Chat</Link></li>
                            <li><Link to="/tour" className="text-white text-decoration-none">Tour</Link></li>
                            <li><Link to="/aboutus" className="text-white text-decoration-none">About Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={7} className="py-1">
                        <center><h6 className="mb-1">What is Sassy Squad?</h6></center>
                        <p className="mb-0" style={{ fontSize: '0.83rem' }}>We are a travel and tour AI chatbot created to help you explore Thailand easily and confidently.
                            Our goal is to make travel planning simple by giving you clear information, helpful suggestions, and local insights in real time.</p>
                    </Col>
                    <Col md={3}>
                        <h6 className="fw-bold mb-2" style={{ color: 'var(--color-primary)' }}>Contact Us</h6>
                        <p className="mb-1" style={{ fontSize: '0.83rem' }}><FaEnvelope style={{ color: 'var(--color-primary)' }} /> contact@sassysquad.travel</p>
                        <p className="mb-1" style={{ fontSize: '0.83rem' }}><FaPhone style={{ color: 'var(--color-primary)' }} /> +66 123 456 789</p>
                        <p className="mb-0" style={{ fontSize: '0.83rem' }}><FaMapMarkerAlt style={{ color: 'var(--color-primary)' }} /> Bangkok, Thailand</p>
                    </Col>
                </Row>
                <hr className="my-2" style={{ borderColor: 'var(--color-border)' }} />
                <Row>
                    <Col md={12} className="text-center pb-2">
                        <p className="mb-0" style={{ fontSize: '0.8rem' }}>&copy; 2026 Sassy Squad. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
