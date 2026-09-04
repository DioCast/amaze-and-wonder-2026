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
                const q = query(
                    collection(db, 'bookings'),
                    where('eventStatus', '==', 'Confirmed'),
                    orderBy('eventDate', 'asc'),
                    limit(3)
                );
                const snapshot = await getDocs(q);
                setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUpcomingEvents();
    }, []);

    return (
        <div className="w-full text-white">
            <h2 className="forum text-3xl font-bold mb-6 border-b border-[#333] pb-3">
                Upcoming Events
            </h2>

            {isLoading ? (
                <div className="text-center text-gray-400 py-10">Loading upcoming events...</div>
            ) : events.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No upcoming events currently scheduled.</div>
            ) : (
                /* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}