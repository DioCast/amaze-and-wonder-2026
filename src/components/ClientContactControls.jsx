import React from 'react';

export default function ClientContactControls({
    clientName, setClientName,
    clientPhone, setClientPhone,
    clientEmail, setClientEmail,
    requestDate
}) {
    const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none', marginTop: '0.25rem' };
    const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' };

    // Safely format Firestore timestamp or fallback to string
    const displayDate = requestDate?.toDate
        ? requestDate.toDate().toLocaleString()
        : (requestDate || 'N/A');

    return (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#262626', border: '1px solid #333', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
                Client Contact
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <label style={labelStyle}>Client Name</label>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Request Date</label>
                    <input type="text" value={displayDate} disabled style={{ ...inputStyle, backgroundColor: '#333', color: '#9CA3AF', cursor: 'not-allowed', border: '1px solid #333' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} style={inputStyle} />
                </div>
            </div>
        </div>
    );
}