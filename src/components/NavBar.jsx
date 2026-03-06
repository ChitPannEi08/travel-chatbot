import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function NavBar() {
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'th', label: 'ไทย', flag: '🇹🇭' },
        { code: 'mm', label: 'မြန်မာ', flag: '🇲🇲' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <Navbar bg="white" expand="lg" className="fixed-top shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/homepage" className="fw-bold fs-4" style={{ color: '#2E3D5D' }}>
                    Sassy Squad
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <Nav.Link as={Link} to="/homepage" className="px-lg-3 py-2 py-lg-0" style={{ fontWeight: 'bold', color: '#2E3D5D' }} >{t('nav_home')}</Nav.Link>
                        <Nav.Link as={Link} to="/chat" className="px-lg-3 py-2 py-lg-0" style={{ fontWeight: 'bold', color: '#2E3D5D' }}>{t('nav_chat')}</Nav.Link>
                        <Nav.Link as={Link} to="/tour" className="px-lg-3 py-2 py-lg-0" style={{ fontWeight: 'bold', color: '#2E3D5D' }}>{t('nav_tour')}</Nav.Link>
                        <Nav.Link as={Link} to="/aboutus" className="px-lg-3 py-2 py-lg-0" style={{ fontWeight: 'bold', color: '#2E3D5D' }}>{t('nav_about')}</Nav.Link>

                        <NavDropdown
                            title={`${currentLang.flag} ${currentLang.label}`}
                            id="language-nav-dropdown"
                            className="px-lg-3 py-2 py-lg-0 fw-bold"
                            style={{ color: '#2E3D5D' }}
                        >
                            {languages.map((lang) => (
                                <NavDropdown.Item
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    active={language === lang.code}
                                >
                                    {lang.flag} {lang.label}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <Nav.Link as={Link} to="/signin" className="px-lg-3 py-2 py-lg-0" style={{ fontWeight: 'bold', color: '#2E3D5D' }}>{t('nav_logout')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;