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
    return (
        <div className="p-4 mb-6 bg-[#262626] border border-[#333] rounded-md shadow-sm">
            <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-wider border-b border-[#444] pb-2">
                Event Details
            </h3>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Title</label>
                <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Date</label>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Time</label>
                    <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Type</label>
                    <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    >
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
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Audience Size</label>
                    <input
                        type="text"
                        value={eventSize}
                        onChange={(e) => setEventSize(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    />
                </div>
            </div>

            {/* Venue blocks moved to full width */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Venue Name</label>
                <input
                    type="text"
                    value={eventVenueName}
                    onChange={(e) => setEventVenueName(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Venue Address</label>
                <textarea
                    rows="2"
                    value={eventVenueAddress}
                    onChange={(e) => setEventVenueAddress(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors resize-none"
                />
            </div>
        </div>
    );
}