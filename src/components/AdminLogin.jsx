import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid admin credentials. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <div style={{ backgroundColor: 'rgba(45, 45, 45, 0.9)', padding: '3rem', borderRadius: '1rem', border: '1px solid #444', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                <h2 className="forum" style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '2rem', textAlign: 'center' }}>
                    Authorized <span style={{ color: '#EAB308' }}>Access</span>
                </h2>

                {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Admin Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#1a1a1a', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#1a1a1a', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                    </div>
                    <button type="submit" className="gold-button" style={{ width: '100%', padding: '1rem', borderRadius: '0.375rem', fontSize: '1.125rem', fontWeight: 'bold', marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}