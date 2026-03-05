import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const phrases = [
    { english: 'Hello', thai: 'สวัสดี', phonetic: 'Sawasdee' },
    { english: 'Thank you', thai: 'ขอบคุณ', phonetic: 'Khob khun' },
    { english: 'How much?', thai: 'เท่าไหร่', phonetic: 'Tao rai?' },
    { english: 'Delicious', thai: 'อร่อย', phonetic: 'Aroi' },
    { english: 'Where is...?', thai: 'อยู่ที่ไหน', phonetic: 'Yu tee nai?' },
    { english: 'Help', thai: 'ช่วยด้วย', phonetic: 'Chuay duay' },
    { english: 'Goodbye', thai: 'ลาก่อน', phonetic: 'La gon' },
    { english: 'Yes', thai: 'ใช่', phonetic: 'Chai' },
    { english: 'No', thai: 'ไม่', phonetic: 'Mai' },
    { english: 'Sorry', thai: 'ขอโทษ', phonetic: 'Khor thot' },
    { english: 'Excuse me', thai: 'ขอโทษครับ/ค่ะ', phonetic: 'Khor thot krab/ka' },
    { english: 'Please', thai: 'กรุณา', phonetic: 'Karuna' },
    { english: 'Water', thai: 'น้ำ', phonetic: 'Nam' },
    { english: 'Bathroom', thai: 'ห้องน้ำ', phonetic: 'Hong nam' },
    { english: 'I don\'t understand', thai: 'ไม่เข้าใจ', phonetic: 'Mai kao jai' },
    { english: 'Can you help me?', thai: 'ช่วยได้ไหม', phonetic: 'Chuay dai mai?' },
    { english: 'Too expensive', thai: 'แพงเกินไป', phonetic: 'Paeng gern pai' },
    { english: 'Very good', thai: 'ดีมาก', phonetic: 'Dee mak' },
    { english: 'Beautiful', thai: 'สวย', phonetic: 'Suay' },
    { english: 'I\'m lost', thai: 'ฉันหลงทาง', phonetic: 'Chan long tang' },
    { english: 'Call police', thai: 'เรียกตำรวจ', phonetic: 'Riak tam ruat' },
    { english: 'Hospital', thai: 'โรงพยาบาล', phonetic: 'Rong paya ban' },
    { english: 'Taxi', thai: 'แท็กซี่', phonetic: 'Taxi' },
    { english: 'Airport', thai: 'สนามบิน', phonetic: 'Sanam bin' },
    { english: 'Hotel', thai: 'โรงแรม', phonetic: 'Rong raem' }
];

const PhrasesWidget = () => {
    const [selected, setSelected] = useState(null);
    const [playing, setPlaying] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value ? phrases.find(p => p.english === value) : null);
        setPlaying(false);
        window.speechSynthesis?.cancel();
    };

    const speak = () => {
        if (!selected || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        const utter = new SpeechSynthesisUtterance(selected.thai);
        const voices = window.speechSynthesis.getVoices();
        const thaiVoice = voices.find(v => v.lang === 'th-TH' || v.lang.startsWith('th'));
        if (thaiVoice) utter.voice = thaiVoice;
        utter.lang = 'th-TH';
        utter.rate = 0.85;

        setPlaying(true);
        utter.onend = () => setPlaying(false);
        utter.onerror = () => setPlaying(false);

        window.speechSynthesis.speak(utter);
    };

    return (
        <Container className="mt-4 mb-4">
            <h3 className="fw-bold text-center mb-4" style={{ color: '#2E3D5D' }}>
                🇹🇭 Essential Thai Phrases
            </h3>

            <Form.Select
                onChange={handleChange}
                className="mb-4"
                defaultValue=""
                style={{ border: '1px solid #494a4dff', color: '#2E3D5D' }}
            >
                <option value="">— Select a Phrase —</option>
                {phrases.map((p) => (
                    <option key={p.english} value={p.english}>
                        {p.english}
                    </option>
                ))}
            </Form.Select>

            {selected && (
                <Card className="shadow text-center" style={{ border: '2px solid #2E3D5D' }}>
                    <Card.Body className="py-4">
                        <div style={{ fontSize: '3rem', fontWeight: 700, color: '#2E3D5D', lineHeight: 1.2 }}>
                            {selected.thai}
                        </div>
                        <div style={{ fontSize: '1rem', color: '#888', fontStyle: 'italic', marginTop: '6px' }}>
                            {selected.phonetic}
                        </div>
                        <div className="fw-semibold mt-2" style={{ fontSize: '1.1rem', color: '#333' }}>
                            {selected.english}
                        </div>
                        <Button
                            className="mt-3"
                            disabled={playing}
                            onClick={speak}
                            style={{
                                backgroundColor: playing ? '#6c757d' : '#2E3D5D',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '6px 24px',
                                fontSize: '0.9rem',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            {playing ? '🔊 Playing…' : '▶ Play Pronunciation'}
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default PhrasesWidget;
