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
    // 1. Added ticketPrice to the destructuring assignment
    const { imageURL, eventTitle, eventVenueName, eventDate, eventTime, eventOverview, ticketURL, ticketPrice } = event;

    return (
        <div className="flex flex-col bg-[#2a2828] rounded-xl border border-[#444] overflow-hidden w-full h-full shadow-md">

            {/* 16:9 Landscape Image Container */}
            <div className="w-full aspect-[16/9] bg-[#1a1a1a] relative shrink-0">
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt={eventTitle}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm font-medium">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Card Text Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-[1.15rem] font-bold text-white leading-tight mb-2">
                    {eventTitle || 'Event Title TBD'}
                </h3>

                <div className="mb-3">
                    <p className="text-[0.95rem] font-bold text-gray-200 mb-1">
                        {formatEventDateTime(eventDate, eventTime)}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                        {eventVenueName || 'Venue TBD'}
                    </p>
                </div>

                {/* line-clamp-3 automatically handles the text truncation with an ellipsis */}
                <p className="text-sm text-gray-300 mb-6 line-clamp-3">
                    {eventOverview || 'No description provided.'}
                </p>

                {/* Ticket Info & Button (Conditionally Rendered) */}
                {ticketURL && (
                    <div className="mt-auto pt-2">
                        <div className="text-sm font-bold text-white mb-2">
                            {Number(ticketPrice) > 0
                                ? `From $${Number(ticketPrice).toFixed(2)}`
                                : 'From $TBD'}
                        </div>
                        <a
                            href={ticketURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2.5 px-4 rounded-lg font-semibold text-sm bg-[#EAB308] text-black hover:bg-yellow-400 transition-colors"
                        >
                            Get Tickets
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}