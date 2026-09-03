import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // ⚠️ Ensure this path points to your actual Firebase init file
import EventManager from './EventManager';

export default function EventsPipelineDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // 1. Query the 'bookings' collection, sorting by newest first
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

    // 2. Set up the real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Spreads all your database fields (eventSize, eventType, etc.) directly into state
      }));
      setEvents(liveEvents);
    }, (error) => {
      console.error("Error fetching pipeline events: ", error);
    });

    // 3. Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  const handleRowClick = (eventRecord) => {
    setSelectedEvent(eventRecord);
    setIsDrawerOpen(true);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'transparent', color: '#FFFFFF' }}>
      <h1 className="forum" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Events Pipeline</h1>

      <div style={{ overflowX: 'auto', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#262626', borderBottom: '1px solid #333' }}>
            <tr>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</th>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event</th>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Venue</th>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
              <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr
                key={evt.id}
                onClick={() => handleRowClick(evt)}
                style={{ cursor: 'pointer', borderBottom: '1px solid #333', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#ffffff', verticalAlign: 'top' }}>
                  {evt.clientName}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#9CA3AF', verticalAlign: 'top', wordBreak: 'break-word', maxWidth: '200px' }}>
                  {evt.eventTitle}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#9CA3AF', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                  {evt.eventDate}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#9CA3AF', verticalAlign: 'top', wordBreak: 'break-word', maxWidth: '250px' }}>
                  {evt.eventVenueName}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#9CA3AF', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                  {evt.eventType}
                </td>
                <td style={{ padding: '1rem 1.5rem', verticalAlign: 'top' }}>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#854d0e', backgroundColor: '#fef08a', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
                    {evt.eventStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EventManager
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        eventData={selectedEvent}
      />

    </div>
  );
}