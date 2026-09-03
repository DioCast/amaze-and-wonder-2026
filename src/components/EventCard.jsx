import React from 'react';

const formatEventDateTime = (dateStr, timeStr) => {
    if (!dateStr) return '';
    try {
        const dateObj = new Date(`${dateStr}T00:00:00`);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric'
        });

        let formattedTime = '';
        if (timeStr) {
            const [hours, minutes] = timeStr.split(':');
            const h = parseInt(hours, 10);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            const minStr = minutes === '00' ? '' : `:${minutes}`;
            formattedTime = ` • ${h12}${minStr} ${ampm}`;
        }
        return `${formattedDate}${formattedTime}`;
    } catch (e) {
        return `${dateStr} • ${timeStr}`;
    }
};

export default function EventCard({ event }) {
    const { imageURL, eventTitle, eventVenueName, eventDate, eventTime, eventOverview, ticketURL } = event;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#2a2828', borderRadius: '12px', border: '1px solid #444', overflow: 'hidden', width: '100%', height: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>

            {/* 16:9 Landscape Image Container */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#1a1a1a', position: 'relative', flexShrink: 0 }}>
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt={eventTitle}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>
                        No Image Available
                    </div>
                )}
            </div>

            {/* Card Text Content */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2, margin: '0 0 0.5rem 0' }}>
                    {eventTitle || 'Event Title TBD'}
                </h3>

                <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#e5e7eb', margin: '0 0 0.25rem 0' }}>
                        {formatEventDateTime(eventDate, eventTime)}
                    </p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#9ca3af', margin: 0 }}>
                        {eventVenueName || 'Venue TBD'}
                    </p>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {eventOverview || 'No description provided.'}
                </p>

                {/* Ticket Button */}
                <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <a
                        href={ticketURL || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'center',
                            padding: '0.625rem 1rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            textDecoration: 'none',
                            backgroundColor: ticketURL ? '#EAB308' : '#333',
                            color: ticketURL ? '#000000' : '#6b7280',
                            cursor: ticketURL ? 'pointer' : 'not-allowed',
                            boxSizing: 'border-box'
                        }}
                        onClick={(e) => !ticketURL && e.preventDefault()}
                    >
                        {ticketURL ? 'Get Tickets' : 'Tickets Unavailable'}
                    </a>
                </div>
            </div>
        </div>
    );
}