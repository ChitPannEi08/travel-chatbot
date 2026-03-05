import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/THB';

export const CurrencyRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setRates(data.rates);

                const date = new Date(data.date);
                setLastUpdated(date.toLocaleDateString());

                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const getRate = (currencyCode) => {
        if (!rates || !rates[currencyCode]) return "...";
        return (1 / rates[currencyCode]).toFixed(2);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <center><h3 className="widget-title">Currency Exchange Rate (THB)</h3></center>
                </Col>
            </Row>
            {/* USD to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 US Dollar</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("USD")} Thai Baht</p>
                </Col>
            </Row>
            {/* EUR to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 Euro</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("EUR")} Thai Baht</p>
                </Col>
            </Row>
            {/* GBP to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 British Pound</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("GBP")} Thai Baht</p>
                </Col>
            </Row>
            {/* AUD to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 Australian Dollar</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("AUD")} Thai Baht</p>
                </Col>
            </Row>
            {/* SDG to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 Singapore Dollar</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("SGD")} Thai Baht</p>
                </Col>
            </Row>
            {/* AED to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 UAE Dirham</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("AED")} Thai Baht</p>
                </Col>
            </Row>
            {/* JPY to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 Japanese Yen</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("JPY")} Thai Baht</p>
                </Col>
            </Row>
            {/* KRW to THB */}
            <Row className="mb-2">
                <Col xs={5}>
                    <p className="mb-0">1 South Korean Won</p>
                </Col>
                <Col xs={2} className="text-center">
                    <p className="mb-0"> = </p>
                </Col>
                <Col xs={5} className="text-end">
                    <p className="mb-0">{getRate("KRW")} Thai Baht</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <center><small>Last Updated: {lastUpdated}</small></center>
                </Col>
            </Row>
        </Container>
    );
};

export const CurrencyCalculator = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("THB");
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                console.error("Error fetching rates:", error);
            }
        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (rates[fromCurrency] && rates[toCurrency]) {
            const converted = (amount / rates[fromCurrency]) * rates[toCurrency];
            setResult(converted.toFixed(2));
        }
    }, [amount, fromCurrency, toCurrency, rates]);

    const commonCurrencies = ["THB", "USD", "EUR", "GBP", "JPY", "KRW", "AUD", "CAD", "SGD", "CNY", "AED"];

    return (
        <Container>
            <Row>
                <Col>
                    <center><h4 className="widget-title mb-2">Currency Calculator</h4></center>
                </Col>
            </Row>
            <Form>
                <Form.Group className="mb-2">
                    <Form.Label className="small mb-1">Amount</Form.Label>
                    <Form.Control
                        type="number"
                        size="sm"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        style={{ borderRadius: '8px' }}
                    />
                </Form.Group>
                <Row className="g-2">
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="small mb-1">From</Form.Label>
                            <Form.Select
                                size="sm"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                style={{ borderRadius: '8px' }}
                            >
                                {commonCurrencies.sort().map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="small mb-1">To</Form.Label>
                            <Form.Select
                                size="sm"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                style={{ borderRadius: '8px' }}
                            >
                                {commonCurrencies.sort().map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Card className="mt-2 p-2 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '12px' }}>
                    <p className="mb-0 small" style={{ color: '#ffffffff' }}>
                        {amount} {fromCurrency} =
                    </p>
                    <h3 className="fw-bold mb-0" style={{ color: '#fbbf24' }}>
                        {result} {toCurrency}
                    </h3>
                </Card>
            </Form>
        </Container>
    );
};

// Default export for backward compatibility if needed, though we should update Home.jsx
const CurrencyWidget = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CurrencyRates />
        <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <CurrencyCalculator />
    </div>
);

export default CurrencyWidget;
