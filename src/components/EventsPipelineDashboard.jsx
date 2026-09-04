import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import EventManager from './EventManager';

export default function EventsPipelineDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(liveEvents);
    }, (error) => {
      console.error("Error fetching pipeline events: ", error);
    });
    return () => unsubscribe();
  }, []);

  const handleRowClick = (eventRecord) => {
    setSelectedEvent(eventRecord);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full text-white mt-12">
      <h2 className="forum text-3xl font-bold mb-6 border-b border-[#333] pb-3">
        Events Pipeline
      </h2>

      <div className="overflow-x-auto bg-[#1a1a1a] border border-[#333] rounded-lg shadow-sm">
        {/* min-w-[800px] forces a clean horizontal scrollbar on mobile instead of squishing text */}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-[#262626] border-b border-[#333]">
            <tr>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Contact</th>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Event</th>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Date</th>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Venue</th>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Type</th>
              <th className="py-3 px-6 text-xs font-bold text-gray-300 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr
                key={evt.id}
                onClick={() => handleRowClick(evt)}
                className="cursor-pointer border-b border-[#333] hover:bg-[#333] transition-colors duration-200"
              >
                <td className="py-4 px-6 text-sm font-medium text-white align-top">{evt.clientName}</td>
                <td className="py-4 px-6 text-sm text-gray-400 align-top break-words max-w-[200px]">{evt.eventTitle}</td>
                <td className="py-4 px-6 text-sm text-gray-400 align-top whitespace-nowrap">{evt.eventDate}</td>
                <td className="py-4 px-6 text-sm text-gray-400 align-top break-words max-w-[250px]">{evt.eventVenueName}</td>
                <td className="py-4 px-6 text-sm text-gray-400 align-top whitespace-nowrap">{evt.eventType}</td>
                <td className="py-4 px-6 align-top">
                  <span className="inline-block px-2 py-1 text-xs font-bold text-[#854d0e] bg-[#fef08a] rounded-full whitespace-nowrap">
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