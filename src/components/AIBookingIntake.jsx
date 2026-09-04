import { useState, useEffect } from 'react';
import {
    User, Mail, Phone, Briefcase, Tag, Users, Calendar, Clock, MapPin, Building2
} from 'lucide-react';

export default function AIBookingIntake() {
    const [prompt, setPrompt] = useState(() => localStorage.getItem('aiBookingDraft') || "");
    const [status, setStatus] = useState("idle");
    const [responseMsg, setResponseMsg] = useState("");
    const [documentId, setDocumentId] = useState("");
    const [bookingData, setBookingData] = useState(null);
    const [rawNote, setRawNote] = useState("");

    // 2. Auto-save every time the prompt changes
    useEffect(() => {
        localStorage.setItem('aiBookingDraft', prompt);
    }, [prompt]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setStatus("loading");
        setResponseMsg("");
        setDocumentId("");
        setBookingData(null);
        setRawNote(prompt);

        try {
            const response = await fetch("https://us-west2-amaze-and-wonder-2026.cloudfunctions.net/processBookingIntake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: prompt })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setResponseMsg("Extracted and saved!");
                setDocumentId(data.documentId);
                setBookingData(data.data);
                setPrompt("");
                localStorage.removeItem('aiBookingDraft');
            } else {
                setStatus("error");
                setResponseMsg(data.error || "Failed to process the request.");
            }
        } catch (error) {
            setStatus("error");
            setResponseMsg("Network error. Could not reach the cloud function.");
        }
    };

    return (
        <div className="p-8 bg-[#1a1a1a] rounded-xl border-2 border-dashed border-[#333] my-8 mx-auto max-w-3xl font-sans">

            {/* HEADER */}
            <h3 className="mt-0 text-[#EAB308] text-2xl flex items-center gap-2 mb-2 font-bold">
                🧪 Beta: AI Event Booking Intake
            </h3>
            <p className="text-base text-gray-300 mb-1">
                Type a natural sentence to begin the intake process.
            </p>
            <p className="text-sm text-gray-400 mt-0 mb-6">
                <strong className="text-gray-300">Example:</strong> I need a corporate show for 50 people on October 31st.  You can reach me at myName@domainName.com or call me at xxx, my name is Marie.
            </p>

            {/* INPUT FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    rows="3"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the event details here..."
                    className="w-full p-4 rounded-md border border-[#444] bg-[#262626] text-white placeholder-gray-500 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] outline-none resize-y transition-colors"
                    disabled={status === "loading"}
                />

                <button
                    type="submit"
                    disabled={status === "loading" || !prompt.trim()}
                    className="p-3.5 bg-black text-white border border-[#333] rounded-md font-semibold text-base transition-colors hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? "Processing with Gemini..." : "Submit to AI ⚙️"}
                </button>
            </form>

            {/* SUCCESS MESSAGE */}
            {status === "success" && (
                <div className="mt-6 p-4 rounded-md bg-[#022c22] text-[#34d399] border border-[#065f46] flex items-center">
                    {responseMsg} Document ID: {documentId}
                </div>
            )}

            {/* ERROR MESSAGE */}
            {status === "error" && (
                <div className="mt-6 p-4 rounded-md bg-[#450a0a] text-[#f87171] border border-[#991b1b] flex items-center">
                    {responseMsg}
                </div>
            )}

            {/* EXTRACTED DETAILS CARD */}
            {bookingData && (
                <div className="mt-6 p-6 bg-[#262626] rounded-lg border border-[#333] shadow-sm">
                    <h4 className="m-0 mb-4 text-white text-lg border-b border-[#444] pb-3 font-bold">
                        Extracted Details
                    </h4>

                    <div className="flex flex-col gap-3 text-base text-gray-300">
                        <div className="flex items-center gap-2"><User size={18} className="text-[#EAB308]" /> <strong className="text-white">Client Name:</strong> {bookingData.clientName}</div>
                        <div className="flex items-center gap-2"><Mail size={18} className="text-[#EAB308]" /> <strong className="text-white">Email:</strong> {bookingData.clientEmail}</div>
                        <div className="flex items-center gap-2"><Phone size={18} className="text-[#EAB308]" /> <strong className="text-white">Phone Number:</strong> {bookingData.clientPhone}</div>
                        <div className="flex items-center gap-2"><Briefcase size={18} className="text-[#EAB308]" /> <strong className="text-white">Event Name:</strong> {bookingData.eventTitle}</div>
                        <div className="flex items-center gap-2"><Tag size={18} className="text-[#EAB308]" /> <strong className="text-white">Event Type:</strong> {bookingData.eventType}</div>
                        <div className="flex items-center gap-2"><Users size={18} className="text-[#EAB308]" /> <strong className="text-white">Audience Size:</strong> {bookingData.eventSize}</div>
                        <div className="flex items-center gap-2"><Calendar size={18} className="text-[#EAB308]" /> <strong className="text-white">Date:</strong> {bookingData.eventDate}</div>
                        <div className="flex items-center gap-2"><Clock size={18} className="text-[#EAB308]" /> <strong className="text-white">Time:</strong> {bookingData.eventTime}</div>
                        <div className="flex items-center gap-2"><Building2 size={18} className="text-[#EAB308]" /> <strong className="text-white">Venue:</strong> {bookingData.eventVenueName}</div>
                        <div className="flex items-center gap-2"><MapPin size={18} className="text-[#EAB308]" /> <strong className="text-white">Address:</strong> {bookingData.eventVenueAddress}</div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-[#444] text-gray-400 text-sm">
                        <strong className="text-gray-300">Raw note:</strong> {rawNote}
                    </div>
                </div>
            )}
        </div>
    );
}