import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Card, Row, Col, Container, Badge, ListGroup } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';
import { FaStar } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ReviewDashboard = ({ onTourSelect }) => {
    const { t } = useLanguage();

    const barChartRef = useRef(null);
    const donutChartRef = useRef(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();

        const subscription = supabase
            .channel('reviews_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'review' }, payload => {
                setReviews(prev => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('review')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setReviews(data);
        } else if (error) {
            console.error("Error fetching reviews:", error.message);
        }
        setLoading(false);
    };

    const normalizeTitle = (title) => {
        if (!title) return "Unknown";
        const t = title.toLowerCase();
        if (t.includes("bangkok city")) return "Bangkok City Tour";
        if (t.includes("chiang mai city")) return "Chiang Mai City Tour";
        if (t.includes("pattaya city")) return "Pattaya City Tour";
        if (t.includes("ayutthaya city")) return "Ayutthaya City Tour";
        if (t.includes("chiang rai city")) return "Chiang Rai City Tour";
        if (t.includes("phuket city")) return "Phuket City Tour";
        if (t.includes("bangkok temple")) return "Bangkok Temple";
        if (t.includes("ayutthaya historical")) return "Ayutthaya Historical";
        if (t.includes("floating market")) return "Floating Market";
        if (t.includes("pattaya beach")) return "Pattaya Beach";
        if (t.includes("doi suthep")) return "Chiang Mai Doi Suthep";
        if (t.includes("phuket island")) return "Phuket Island";
        return title;
    };

    const generateDonutColors = (count) => {
        const baseColors = [
            '#2E3D5D', '#4A5D7E', '#FF6B6B', '#021d74ff',
            '#FFE66D', '#1A535C', '#fa3707ff', '#AA4465',
            '#860884', '#00AD7C', '#ee9999ff', '#008080'
        ];
        if (count <= baseColors.length) return baseColors.slice(0, count);
        return Array.from({ length: count }, (_, i) => {
            if (i < baseColors.length) return baseColors[i];
            const hue = (i * 137) % 360;
            const saturation = 50 + (i % 3) * 10;
            const lightness = 40 + (i % 2) * 10;
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        });
    };

    const chartData = useMemo(() => {
        const tourStats = {};
        const tourCounts = {};

        // --- MOCK DATA BASELINE ---
        const mockData = [
            { title: "Bangkok City Tour", trans: 4.5, acc: 4.2, meal: 4.8, gK: 4.9, gV: 4.7, over: 4.8, count: 42 },
            { title: "Chiang Mai City Tour", trans: 4.2, acc: 4.5, meal: 4.9, gK: 4.8, gV: 4.6, over: 4.7, count: 28 },
            { title: "Pattaya City Tour", trans: 4.1, acc: 4.0, meal: 4.5, gK: 4.5, gV: 4.5, over: 4.4, count: 35 },
            { title: "Ayutthaya City Tour", trans: 4.0, acc: 3.8, meal: 4.2, gK: 4.8, gV: 4.6, over: 4.3, count: 15 },
            { title: "Chiang Rai City Tour", trans: 4.3, acc: 4.4, meal: 4.6, gK: 4.7, gV: 4.8, over: 4.6, count: 20 },
            { title: "Phuket City Tour", trans: 4.6, acc: 4.8, meal: 4.5, gK: 4.4, gV: 4.5, over: 4.7, count: 18 },
            { title: "Bangkok Temple", trans: 4.8, acc: 0, meal: 4.8, gK: 4.9, gV: 4.8, over: 4.9, count: 50 },
            { title: "Ayutthaya Historical", trans: 4.5, acc: 0, meal: 4.6, gK: 5.0, gV: 4.9, over: 4.8, count: 38 },
            { title: "Floating Market", trans: 4.2, acc: 0, meal: 4.9, gK: 4.3, gV: 4.4, over: 4.5, count: 40 },
            { title: "Pattaya Beach", trans: 4.4, acc: 0, meal: 4.3, gK: 4.1, gV: 4.2, over: 4.3, count: 25 },
            { title: "Chiang Mai Doi Suthep", trans: 4.1, acc: 0, meal: 4.5, gK: 4.7, gV: 4.6, over: 4.6, count: 22 },
            { title: "Phuket Island", trans: 4.6, acc: 0, meal: 4.8, gK: 4.6, gV: 4.5, over: 4.7, count: 32 },
        ];

        mockData.forEach(m => {
            tourCounts[m.title] = m.count;
            tourStats[m.title] = {
                transportation: { sum: m.trans * m.count, count: m.trans > 0 ? m.count : 0 },
                accommodation: { sum: m.acc * m.count, count: m.acc > 0 ? m.count : 0 },
                meal: { sum: m.meal * m.count, count: m.meal > 0 ? m.count : 0 },
                guideKnowledge: { sum: m.gK * m.count, count: m.gK > 0 ? m.count : 0 },
                guideVoice: { sum: m.gV * m.count, count: m.gV > 0 ? m.count : 0 },
                overall: { sum: m.over * m.count, count: m.over > 0 ? m.count : 0 }
            };
        });
        // -------------------------

        const validReviews = reviews.filter(r => r.tour_title);

        validReviews.forEach(r => {
            const normalizedTitle = normalizeTitle(r.tour_title);

            if (!tourStats[normalizedTitle]) {
                tourStats[normalizedTitle] = {
                    transportation: { sum: 0, count: 0 },
                    accommodation: { sum: 0, count: 0 },
                    meal: { sum: 0, count: 0 },
                    guideKnowledge: { sum: 0, count: 0 },
                    guideVoice: { sum: 0, count: 0 },
                    overall: { sum: 0, count: 0 }
                };
                tourCounts[normalizedTitle] = 0;
            }

            tourCounts[normalizedTitle] += 1;

            const incrementStat = (category, value) => {
                if (value && value > 0) {
                    tourStats[normalizedTitle][category].sum += value;
                    tourStats[normalizedTitle][category].count += 1;
                }
            };

            incrementStat('transportation', r.transportation);
            incrementStat('accommodation', r.accommodation);
            incrementStat('meal', r.meal);
            incrementStat('guideKnowledge', r.guide_knowledge);
            incrementStat('guideVoice', r.guide_voice);
            incrementStat('overall', r.overall);
        });

        const labels = Object.keys(tourStats);

        const getAverages = (category) => labels.map(label => {
            const stat = tourStats[label][category];
            return stat.count > 0 ? (stat.sum / stat.count).toFixed(1) : 0;
        });

        const chartConfigs = [
            { key: 'overall', title: 'Overall Rating', color: '#2E3D5D', data: getAverages('overall') },
            { key: 'guideKnowledge', title: 'Guide Knowledge', color: '#FF6B6B', data: getAverages('guideKnowledge') },
            { key: 'guideVoice', title: 'Guide Voice', color: '#AA4465', data: getAverages('guideVoice') },
            { key: 'transportation', title: 'Transportation', color: '#1A535C', data: getAverages('transportation') },
            { key: 'meal', title: 'Meal', color: '#FFE66D', data: getAverages('meal') },
            { key: 'accommodation', title: 'Accommodation', color: '#00AD7C', data: getAverages('accommodation') },
        ];

        const allBarCharts = chartConfigs.map(config => {
            const filteredLabels = [];
            const filteredData = [];
            config.data.forEach((val, idx) => {
                if (val > 0) {
                    filteredLabels.push(labels[idx]);
                    filteredData.push(val);
                }
            });
            return {
                title: config.title,
                originalLabels: filteredLabels,
                data: {
                    labels: filteredLabels,
                    datasets: [{
                        label: config.title,
                        data: filteredData,
                        backgroundColor: config.color,
                    }]
                }
            };
        });

        // Doughnut Chart Data
        const pieCounts = labels.map(l => tourCounts[l]);
        const pieColors = generateDonutColors(labels.length);

        // Overall Stats
        const totalMockReviews = mockData.reduce((sum, item) => sum + item.count, 0);
        const totalReviews = totalMockReviews + validReviews.length;

        let totalSum = mockData.reduce((sum, item) => sum + (item.over * item.count), 0);
        let totalCount = mockData.reduce((sum, item) => sum + item.count, 0);

        validReviews.forEach(r => {
            if (r.overall > 0) {
                totalSum += r.overall;
                totalCount += 1;
            }
        });
        const averageOverall = totalCount > 0 ? (totalSum / totalCount).toFixed(1) : 0;
        const mostReviewedTour = labels.length > 0 ? labels.reduce((a, b) => tourCounts[a] > tourCounts[b] ? a : b) : 'None';

        return {
            overallChart: allBarCharts[0],
            otherCharts: allBarCharts.slice(1),
            donutData: {
                labels,
                datasets: [{
                    label: 'Reviews Count',
                    data: pieCounts,
                    backgroundColor: pieColors,
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            stats: [
                { label: 'Total Feedback', value: totalReviews, color: '#4A5D7E' },
                { label: 'Avg Overall Rating', value: `${averageOverall} / 5`, color: '#FF6B6B' },
                { label: 'Most Reviewed', value: mostReviewedTour, color: '#00AD7C' }
            ],
            rawLabels: labels
        };
    }, [reviews]);

    const handleChartClick = (event, chartRef, labels) => {
        if (!chartRef || !chartRef.current) return;
        const chart = chartRef.current;
        const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (elements.length > 0) {
            const index = elements[0].index;
            onTourSelect?.(labels[index]);
        }
    };

    const generateBarOptions = (chartRef, specificLabels) => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#2E3D5D', font: { weight: 'bold' } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.dataset.label}: ${context.raw} / 5`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                grid: { drawBorder: false, color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: {
                grid: { display: false }
            }
        },
        onClick: chartRef && specificLabels ? (e) => handleChartClick(e, chartRef, specificLabels) : null
    });

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (e) => handleChartClick(e, donutChartRef, chartData.rawLabels),
        plugins: {
            legend: {
                position: 'right',
                labels: { padding: 15, usePointStyle: true, boxWidth: 10, font: { size: 11 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.raw} Reviews`
                }
            }
        },
        cutout: '70%'
    };

    const recentFeedback = reviews.filter(r => r.feedback && r.feedback.trim() !== '').slice(0, 5);

    return (
        <Container py={5}>
            <div className="mb-5 text-center mt-5">
                <h2 className="fw-bold mb-4" style={{ color: '#2E3D5D' }}>{t('review_feedback_title')}</h2>
                <p className="text-muted mb-4">{t('review_feedback_subtitle')}</p>
            </div>

            <Row className="g-4">
                {/* Overall Rating Bar Chart Section */}
                <Col lg={7}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '25px' }}>
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4" style={{ color: '#2E3D5D' }}>{t('rating_overall')}</h5>
                            <div style={{ height: '350px' }}>
                                {loading ? (
                                    <div className="d-flex h-100 align-items-center justify-content-center">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : (
                                    <Bar ref={barChartRef} data={chartData.overallChart.data} options={generateBarOptions(barChartRef, chartData.overallChart.originalLabels)} />
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Donut Chart Section */}
                <Col lg={5}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '25px' }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold" style={{ color: '#2E3D5D' }}>{t('review_per_tour')}</h5>
                                <Badge rounded-pill bg="light" text="dark" className="px-3 mt-n1 border">{t('review_distribution')}</Badge>
                            </div>
                            <div style={{ height: '300px', padding: '10px' }}>
                                {loading ? (
                                    <div className="d-flex h-100 align-items-center justify-content-center">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : (
                                    <Doughnut ref={donutChartRef} data={chartData.donutData} options={donutOptions} />
                                )}
                            </div>
                            <div className="mt-4 text-center small text-muted">
                                {t('review_distribution_text')}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Performance Stats Overlay */}
            <Row className="mt-4 g-3 justify-content-center">
                {!loading && chartData.stats.map((stat, i) => (
                    <Col key={i} sm={6} md={3}>
                        <Card className="border-0 shadow-sm text-center p-3" style={{ borderRadius: '15px' }}>
                            <div className="small text-muted mb-1">{stat.label}</div>
                            <div className="h5 fw-bold mb-0" style={{ color: stat.color }}>{stat.value}</div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Other Category Rating Charts */}
            {!loading && chartData.otherCharts && (
                <Row className="mt-4 g-4">
                    {chartData.otherCharts.map((chart, idx) => (
                        <Col lg={6} key={idx}>
                            <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '25px' }}>
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4" style={{ color: '#2E3D5D' }}>{chart.title} Ratings per Tour</h5>
                                    <div style={{ height: '300px' }}>
                                        <Bar data={chart.data} options={generateBarOptions(null, chart.originalLabels)} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Recent Feedback Text */}
            <Row className="mt-4 g-4" style={{ paddingBottom: '30px' }}>
                <Col lg={12}>
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '25px' }}>
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4" style={{ color: '#2E3D5D' }}>Recent Feedback Snippets</h5>
                            {loading ? (
                                <div className="text-center p-3"><div className="spinner-border text-primary" role="status"></div></div>
                            ) : recentFeedback.length > 0 ? (
                                <ListGroup variant="flush">
                                    {recentFeedback.map((r, idx) => (
                                        <ListGroup.Item key={idx} className="border-bottom py-3 px-0">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="fw-bold" style={{ color: '#4A5D7E' }}>{r.tour_title || 'General'}</div>
                                                <div className="d-flex align-items-center">
                                                    <FaStar className="text-warning me-1" />
                                                    <span className="fw-bold">{r.overall}/5</span>
                                                </div>
                                            </div>
                                            <p className="mb-0 text-muted" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                                                "{r.feedback}"
                                            </p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="text-muted text-center py-3">No textual feedback available yet.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewDashboard;
