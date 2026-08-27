import { useState } from 'react';

export default function AIBookingIntake() {
    const [prompt, setPrompt] = useState("");
    const [status, setStatus] = useState("idle");
    const [responseMsg, setResponseMsg] = useState("");
    const [documentId, setDocumentId] = useState("");
    const [bookingData, setBookingData] = useState(null);
    const [rawNote, setRawNote] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setStatus("loading");
        setResponseMsg("");
        setDocumentId("");
        setBookingData(null);
        setRawNote(prompt); // Save the original prompt to display at the bottom

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
        <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '12px', border: '2px dashed #ccc', margin: '2rem auto', maxWidth: '750px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

            {/* HEADER */}
            <h3 style={{ marginTop: 0, color: '#2b2d42', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🧪 Beta: AI Booking Intake
            </h3>
            <p style={{ fontSize: '1rem', color: '#333', marginBottom: '4px' }}>
                Type a natural sentence to begin the intake process.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#111', marginTop: 0, marginBottom: '1.5rem' }}>
                <strong>Example:</strong> I need a corporate show for 50 people on October 31st. My name is Marie.
            </p>

            {/* INPUT FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <textarea
                    rows="3"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the event details here..."
                    style={{ padding: '1rem', borderRadius: '6px', border: '1px solid #ced4da', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' }}
                    disabled={status === "loading"}
                />

                <button
                    type="submit"
                    disabled={status === "loading" || !prompt.trim()}
                    style={{ padding: '0.85rem', background: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'background 0.2s' }}
                >
                    {status === "loading" ? "Processing with Gemini..." : "Submit to AI ⚙️"}
                </button>
            </form>

            {/* SUCCESS MESSAGE */}
            {status === "success" && (
                <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: '6px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', display: 'flex', alignItems: 'center' }}>
                    {responseMsg} Document ID: {documentId}
                </div>
            )}

            {/* EXTRACTED DETAILS CARD */}
            {bookingData && (
                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fff', borderRadius: '8px', border: '1px solid #dee2e6', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#212529', fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>
                        Extracted Details
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.05rem', color: '#333' }}>
                        <div>👤 <strong>Client Name:</strong> {bookingData.clientName}</div>
                        <div>👤 <strong>Email:</strong> {bookingData.clientEmail}</div>
                        <div>👤 <strong>Phone Number:</strong> {bookingData.clientPhone}</div>
                        <div>💼 <strong>Event Name:</strong> {bookingData.eventTitle}</div>
                        <div>💼 <strong>Event Type:</strong> {bookingData.eventType}</div>
                        <div>👥 <strong>Audience Size:</strong> {bookingData.eventSize}</div>
                        <div>📅 <strong>Date:</strong> {bookingData.eventDate}</div>
                        <div>📅 <strong>Time:</strong> {bookingData.eventTime}</div>
                        <div>📅 <strong>Venue:</strong> {bookingData.eventVenue}</div>
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #ccc', color: '#495057', fontSize: '0.95rem' }}>
                        <strong>Raw note:</strong> {rawNote}
                    </div>
                </div>
            )}
        </div>
    );
}