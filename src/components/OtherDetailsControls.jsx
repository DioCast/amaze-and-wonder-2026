import React from 'react';

export default function OtherDetailsControls({
    imageURL, setImageURL,
    ticketURL, setTicketURL,
    eventOverview, setEventOverview
}) {
    return (
        <div className="p-4 mb-6 bg-[#262626] border border-[#333] rounded-md shadow-sm">
            <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-wider border-b border-[#444] pb-2">
                Other Details
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Image URL</label>
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Ticket URL</label>
                    <input
                        type="url"
                        value={ticketURL}
                        onChange={(e) => setTicketURL(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Event Overview</label>
                    <textarea
                        rows="4"
                        value={eventOverview}
                        onChange={(e) => setEventOverview(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors resize-y"
                        placeholder="Brief description of the event..."
                    />
                </div>
            </div>
        </div>
    );
}