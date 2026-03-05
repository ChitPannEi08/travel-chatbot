import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../context/LanguageContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Aboutus = () => {
    const { t } = useLanguage();
    const members = [
        {
            name: "Ngwe Tun",
            position: "Team Leader and Full-stack Developer",
            image: "/images/image1.jpeg"
        },
        {
            name: "Chit Pann Ei",
            position: "UI/UX Designer and Backend Developer",
            image: "/images/image2.jpeg"
        },
        {
            name: "Yoon Shwe Yee",
            position: "UI/UX Designer and Frontend Developer",
            image: "/images/image3.jpeg"
        },
        {
            name: "Hsu Lae Than Htun",
            position: "UI/UX Designer and Frontend Developer",
            image: "/images/image4.jpeg"
        }
    ]

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <NavBar />
            <Container>
                <div className='text-center'>
                    <h1 className='display-4 fw-bold mb-4 text-center' style={{ paddingTop: '80px', color: '#2E3D5D' }}>{t('about_title')}</h1>
                    <p className='text-center mb-5'>
                        {t('about_subtitle')}
                    </p>
                    <p className='text-muted text-center mb-5'>
                        {t('about_description')}
                    </p>
                </div>
                <center><h3 className='text-center' style={{ paddingBottom: '20px', color: '#2E3D5D' }}>{t('team_title')}</h3></center>
                <Row className="pb-5">
                    {members.map((member, index) => (
                        <Col key={index} md={6} className="mb-4">
                            <Card className='text-center h-100 shadow-sm'>
                                <Card.Img variant="top" src={member.image} />
                                <Card.Body>
                                    <Card.Title>{member.name}</Card.Title>
                                    <Card.Text>{member.position}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Aboutus;