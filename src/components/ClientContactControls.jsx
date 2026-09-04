import React from 'react';

export default function ClientContactControls({
    clientName, setClientName,
    clientPhone, setClientPhone,
    clientEmail, setClientEmail,
    requestDate
}) {
    // Safely format Firestore timestamp or fallback to string
    const displayDate = requestDate?.toDate
        ? requestDate.toDate().toLocaleString()
        : (requestDate || 'N/A');

    return (
        <div className="p-4 mb-6 bg-[#262626] border border-[#333] rounded-md shadow-sm">
            <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-wider border-b border-[#444] pb-2">
                Client Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Client Name</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Request Date</label>
                    <input
                        type="text"
                        value={displayDate}
                        disabled
                        className="w-full py-2 px-3 text-sm border border-[#333] bg-[#333] text-gray-400 rounded cursor-not-allowed outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Phone</label>
                    <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Email</label>
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full py-2 px-3 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}