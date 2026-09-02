import React from 'react';

export default function EventDetailsControls({
    eventTitle, setEventTitle,
    eventType, setEventType,
    eventDate, setEventDate,
    eventTime, setEventTime,
    eventSize, setEventSize,
    eventVenueName, setEventVenueName,
    eventVenueAddress, setEventVenueAddress
}) {
    const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none', marginTop: '0.25rem' };
    const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' };

    return (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#262626', border: '1px solid #333', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
                Event Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <label style={labelStyle}>Event Title</label>
                    <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} style={inputStyle} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <label style={labelStyle}>Event Date</label>
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Event Time</label>
                    <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={inputStyle}>
                        <option value="">Select...</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                        <option value="Fundraiser">Fundraiser</option>
                        <option value="Birthday">Birthday</option>
                        <option value="School">School</option>
                        <option value="Other">Other</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyle}>Audience Size</label>
                    <input type="text" value={eventSize} onChange={(e) => setEventSize(e.target.value)} style={inputStyle} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                    <label style={labelStyle}>Venue Name</label>
                    <input type="text" value={eventVenueName} onChange={(e) => setEventVenueName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Venue Address</label>
                    <textarea
                        rows="2"
                        value={eventVenueAddress}
                        onChange={(e) => setEventVenueAddress(e.target.value)}
                        style={{ ...inputStyle, resize: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
}