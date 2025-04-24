import React, { useState } from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        setLoading(true);
        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            setLoading(false);
            if (response.ok) {
                setStatus('Thank you! You will be notified.');
                setEmail('');
            } else if (response.status === 409) {
                setStatus('You are already subscribed.');
            } else {
                const data = await response.json();
                setStatus(data.error || 'Something went wrong.');
            }
        } catch (err) {
            setLoading(false);
            setStatus('Network error. Please try again later.');
        }
    };

    return (
        <div className="coming-soon-container">
            <div className="content">
                <div className="logo-container">
                    <div className="mello-logo-text">mello</div>
                </div>
                <div>
                <h1 className="gradient-text">Coming Soon</h1>
                <form onSubmit={handleSubmit} className="email-form">
                    <input
                        type="email"
                        placeholder="Please enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>Notify Me</button>
                </form>
                {loading && <div className="loader"></div>}
                {status && <p className="notify-text">{status}</p>}
                <p className="notify-text">Notify me when app launched</p>
                </div>
                <div></div>
            </div>

            <footer>
                <div className="footer-left">
                </div>
                <div className="footer-right">
                    <a href="#">Instagram</a>
                    <span className="separator"> / </span>
                    <a href="https://x.com/MellowHealth">X.com</a>
                </div>
            </footer>
        </div>
    );
};

export default ComingSoon;