import React from 'react';

export default function OtherDetailsControls({
    imageURL, setImageURL,
    ticketURL, setTicketURL,
    ticketPrice, setTicketPrice, // New Prop
    eventOverview, setEventOverview
}) {
    return (
        <div className="p-4 mb-6 bg-[#262626] border border-[#333] rounded-md shadow-sm">
            <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-wider border-b border-[#444] pb-2">
                Other Details
            </h3>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Image URL</label>
                <input
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    placeholder="https://..."
                />
            </div>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Ticket URL</label>
                <input
                    type="text"
                    value={ticketURL}
                    onChange={(e) => setTicketURL(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    placeholder="https://eventbrite.com/..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Ticket Price</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-medium">$</span>
                        <input
                            type="number"
                            value={ticketPrice}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                {/* Empty div keeps the ticket price strictly in the left column on desktop */}
                <div className="hidden md:block"></div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Overview</label>
                <textarea
                    rows="3"
                    value={eventOverview}
                    onChange={(e) => setEventOverview(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors resize-y"
                />
            </div>
        </div>
    );
}