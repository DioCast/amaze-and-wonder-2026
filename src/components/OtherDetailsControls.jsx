import React from 'react';

export default function OtherDetailsControls({
    imageURL, setImageURL,
    ticketURL, setTicketURL,
    eventOverview, setEventOverview
}) {
    const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none', marginTop: '0.25rem' };
    const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' };

    return (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#262626', border: '1px solid #333', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
                Other Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                    <label style={labelStyle}>Image URL</label>
                    <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} style={inputStyle} placeholder="https://..." />
                </div>
                <div>
                    <label style={labelStyle}>Ticket URL</label>
                    <input type="url" value={ticketURL} onChange={(e) => setTicketURL(e.target.value)} style={inputStyle} placeholder="https://..." />
                </div>
                <div>
                    <label style={labelStyle}>Event Overview</label>
                    <textarea
                        rows="3"
                        value={eventOverview}
                        onChange={(e) => setEventOverview(e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        placeholder="Summary for poster recreation..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
}