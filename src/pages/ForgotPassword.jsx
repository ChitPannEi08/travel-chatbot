import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

/* ── Styles ─────────────────────────────────────────────────── */
const s = {
    container: {
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffffff",
        position: "relative",
        overflow: "hidden",
        padding: "1rem",
    },
    bg: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 },
    blobBase: {
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        opacity: 0.35,
        animation: "blobFloat 8s ease-in-out infinite alternate",
    },
    blob1: { width: 500, height: 500, background: "radial-gradient(circle, #2E3D5D, #1a54d0ff)", top: -100, left: -150 },
    blob2: { width: 400, height: 400, background: "radial-gradient(circle, #6d28d9, #ce4472ff)", bottom: -80, right: -100, animationDelay: "-3s" },
    blob3: { width: 300, height: 300, background: "radial-gradient(circle, #1a54d0ff, #49A5D4)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", animationDelay: "-5s" },
    card: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 420,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24,
        padding: "2.5rem 2rem",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 32px 64px rgba(0,0,0,0.6)",
    },
    header: { textAlign: "center", marginBottom: "2rem" },
    title: { fontSize: "1.75rem", fontWeight: 700, color: "#000000ff", margin: "0 0 0.4rem", letterSpacing: "-0.02em" },
    subtitle: { fontSize: "0.9rem", color: "#333232ff", margin: 0 },
    errorBox: {
        display: "flex", alignItems: "center", gap: "0.5rem",
        background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
        color: "#f87171", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.875rem", marginBottom: "1.25rem",
    },
    successBox: {
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem", padding: "0.5rem 0",
    },
    successTitle: { fontSize: "1.25rem", fontWeight: 700, color: "#000000ff", margin: 0 },
    successText: { fontSize: "0.9rem", color: "#333232ff", margin: 0, lineHeight: 1.6 },
    form: { display: "flex", flexDirection: "column", gap: "1.25rem" },
    formGroup: { display: "flex", flexDirection: "column", gap: "0.5rem" },
    label: { fontSize: "0.875rem", fontWeight: 500, color: "#797878ff" },
    inputWrap: { position: "relative", display: "flex", alignItems: "center", border: "1px solid #4b4a4aff", borderRadius: 12 },
    inputIcon: { position: "absolute", left: "0.875rem", color: "#797878ff", pointerEvents: "none", flexShrink: 0 },
    input: {
        width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
        padding: "0.75rem 3rem 0.75rem 2.75rem", fontSize: "0.9375rem", fontFamily: "inherit", color: "#000000ff", outline: "none", boxSizing: "border-box",
    },
    eyeBtn: { position: "absolute", right: "0.875rem", background: "none", border: "none", cursor: "pointer", color: "#797878ff", padding: 0, display: "flex", alignItems: "center" },
    submitBtn: {
        marginTop: "0.5rem", width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        color: "#000000ff", fontSize: "0.9375rem", fontWeight: 600, fontFamily: "inherit", border: "none", borderRadius: 12, cursor: "pointer",
        boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
    },
    submitBtnDisabled: { opacity: 0.65, cursor: "not-allowed" },
    spinnerWrap: { display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" },
    footer: { textAlign: "center", marginTop: "1.75rem", marginBottom: 0, fontSize: "0.875rem", color: "#333232ff" },
    signinLink: { color: "#8a66f4ff", fontWeight: 500, textDecoration: "none" },
    backBtn: {
        display: "block", textAlign: "center", textDecoration: "none", marginTop: "1.5rem", width: "100%", padding: "0.85rem",
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#000000ff", fontSize: "0.9375rem", fontWeight: 600,
        fontFamily: "inherit", border: "none", borderRadius: 12, cursor: "pointer", boxSizing: "border-box",
        boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
    },
};

/* ── Eye icons ──────────────────────────────────────────────── */
const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
);
const EyeOff = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/* ── Component ─────────────────────────────────────────────── */
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { directUpdatePassword } = UserAuth();
    const navigate = useNavigate();

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email) return showError("Please enter your email.");
        if (password !== confirmPassword) return showError("Passwords do not match.");
        if (password.length < 6) return showError("Password must be at least 6 characters.");

        setLoading(true);

        // Call the direct mock update method
        const { success: ok } = await directUpdatePassword(email, password);
        setLoading(false);

        if (ok) {
            setSuccess(true);
            setTimeout(() => navigate("/signin"), 2000); // Redirect automatically after success
        }
    };

    return (
        <div style={s.container}>
            <div style={s.bg} aria-hidden="true">
                <div style={{ ...s.blobBase, ...s.blob1 }} />
                <div style={{ ...s.blobBase, ...s.blob2 }} />
                <div style={{ ...s.blobBase, ...s.blob3 }} />
            </div>

            <div style={s.card}>
                <div style={s.header}>
                    <h1 style={s.title}>Forgot Password</h1>
                    <p style={s.subtitle}>Password will be updated automatically</p>
                </div>

                {success ? (
                    <div style={s.successBox}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#34d399" strokeWidth="2" />
                            <path d="M7 12l3.5 3.5 6.5-7" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p style={s.successTitle}>Password Changed!</p>
                        <p style={s.successText}>
                            The password has been updated. Redirecting to Sign In...
                        </p>
                        <Link to="/signin" style={s.backBtn}>Go to Sign In</Link>
                    </div>
                ) : (
                    <form style={s.form} onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div style={s.errorBox} role="alert">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div style={s.formGroup}>
                            <label htmlFor="fp-email" style={s.label}>Email Address</label>
                            <div style={s.inputWrap}>
                                <svg style={s.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                                    <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <input
                                    id="fp-email" type="email" style={s.input} placeholder="your@email.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required
                                />
                            </div>
                        </div>

                        <div style={s.formGroup}>
                            <label htmlFor="fp-password" style={s.label}>New Password</label>
                            <div style={s.inputWrap}>
                                <svg style={s.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <input
                                    id="fp-password" type={showPw ? "text" : "password"} style={s.input} placeholder="Min. 6 characters"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                                <button type="button" style={s.eyeBtn} onClick={() => setShowPw(!showPw)}>
                                    {showPw ? <EyeOff /> : <EyeOpen />}
                                </button>
                            </div>
                        </div>

                        <div style={s.formGroup}>
                            <label htmlFor="fp-confirm" style={s.label}>Confirm New Password</label>
                            <div style={s.inputWrap}>
                                <svg style={s.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <input
                                    id="fp-confirm" type={showConfirmPw ? "text" : "password"} style={s.input} placeholder="Repeat password"
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                />
                                <button type="button" style={s.eyeBtn} onClick={() => setShowConfirmPw(!showConfirmPw)}>
                                    {showConfirmPw ? <EyeOff /> : <EyeOpen />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit" style={{ ...s.submitBtn, ...(loading ? s.submitBtnDisabled : {}) }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span style={s.spinnerWrap}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.75s linear infinite" }}>
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}

                <p style={s.footer}>
                    Back to{" "}
                    <Link to="/signin" style={s.signinLink}>Sign In</Link>
                </p>
            </div>

            <style>{`
                @keyframes blobFloat { from { transform: scale(1) translate(0, 0); } to { transform: scale(1.15) translate(30px, 20px); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                #fp-email::placeholder, #fp-password::placeholder, #fp-confirm::placeholder { color: rgba(255,255,255,0.2); }
                #fp-email:focus, #fp-password:focus, #fp-confirm:focus { border-color: #7c3aed; background: rgba(124,58,237,0.08); box-shadow: 0 0 0 3px rgba(124,58,237,0.2); }
            `}</style>
        </div>
    );
}
