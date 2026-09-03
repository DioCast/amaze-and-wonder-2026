import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function UpcomingEventsGrid() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                // The index should be built by now, so we can re-enable the exact filters and limit to 3 items
                const q = query(
                    collection(db, 'bookings'),
                    // where('eventStatus', '==', 'Confirmed'),
                    orderBy('eventDate', 'asc'),
                    limit(3)
                );
                const snapshot = await getDocs(q);

                const fetchedEvents = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setEvents(fetchedEvents);
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUpcomingEvents();
    }, []);

    return (
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', marginBottom: '1.5rem', paddingBottom: '0.75rem' }}>
                <h1 className="forum" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                    Upcoming Events
                </h1>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2.5rem 0' }}>Loading upcoming events...</div>
            ) : events.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '2.5rem 0' }}>No upcoming events currently scheduled.</div>
            ) : (
                <div style={{
                    display: 'grid',
                    // Forces a 3-column layout by defining exactly 3 equal fractions
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}