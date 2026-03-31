import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const StarRating = ({ value, onChange, label, required }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label className="d-block mb-1" style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>
                {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
            <div className="d-flex text-warning fs-5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        style={{ cursor: 'pointer', color: star <= value ? '#ffc107' : '#e4e5e9', marginRight: '4px' }}
                        onClick={() => onChange(star)}
                    />
                ))}
            </div>
        </Form.Group>
    );
};

const ReviewWidget = ({ tour, onCancel, onSubmit }) => {
    const { t } = useLanguage();

    // Check if accommodation is explicitly included
    const hasAccommodation = tour?.inclusions?.some(inc =>
        inc.toLowerCase().includes('accommodation') || inc.toLowerCase().includes('acc') || inc.toLowerCase().includes('hotel')
    );

    const [ratings, setRatings] = useState({
        transportation: 0,
        accommodation: hasAccommodation ? 0 : null,
        meal: 0,
        guideKnowledge: 0,
        guideVoice: 0,
        overall: 0
    });
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');

    const handleRatingChange = (field, value) => {
        setRatings(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = ['transportation', 'meal', 'guideKnowledge', 'guideVoice', 'overall'];
        if (hasAccommodation) requiredFields.push('accommodation');

        const isComplete = requiredFields.every(field => ratings[field] > 0);

        if (!isComplete) {
            setError(t('review_err_required'));
            return;
        }

        onSubmit({ ratings, feedback });
    };

    return (
        <div className="p-3">
            <h4 className="fw-bold mb-3" style={{ color: 'var(--color-primary)' }}>
                {t('review_form_title')}
            </h4>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-2">
                    <Col md={6}>
                        <StarRating
                            label={t('review_transportation')}
                            value={ratings.transportation}
                            onChange={(val) => handleRatingChange('transportation', val)}
                            required
                        />
                    </Col>
                    {hasAccommodation && (
                        <Col md={6}>
                            <StarRating
                                label={t('review_accommodation')}
                                value={ratings.accommodation}
                                onChange={(val) => handleRatingChange('accommodation', val)}
                                required
                            />
                        </Col>
                    )}
                    <Col md={6}>
                        <StarRating
                            label={t('review_meal')}
                            value={ratings.meal}
                            onChange={(val) => handleRatingChange('meal', val)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <StarRating
                            label={t('review_guide_knowledge')}
                            value={ratings.guideKnowledge}
                            onChange={(val) => handleRatingChange('guideKnowledge', val)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <StarRating
                            label={t('review_guide_voice')}
                            value={ratings.guideVoice}
                            onChange={(val) => handleRatingChange('guideVoice', val)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <StarRating
                            label={t('review_overall')}
                            value={ratings.overall}
                            onChange={(val) => handleRatingChange('overall', val)}
                            required
                        />
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label className="mb-2" style={{ color: 'var(--color-text)' }}>
                        {t('review_feedback')}
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your experience ..."
                        style={{ borderRadius: '10px', border: '1px solid #494a4dff', color: '#212529', backgroundColor: '#ffffff' }}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end gap-3">
                    <Button
                        variant="outline-secondary"
                        onClick={onCancel}
                        style={{ borderRadius: '20px', padding: '8px 24px' }}
                    >
                        {t('review_cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        className="shadow"
                        style={{ borderRadius: '20px', padding: '8px 24px', backgroundColor: '#2E3D5D', borderColor: '#2E3D5D' }}
                    >
                        {t('review_submit')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ReviewWidget;
