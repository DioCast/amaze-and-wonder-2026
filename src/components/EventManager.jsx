import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ClientContactControls from './ClientContactControls';
import EventDetailsControls from './EventDetailsControls';
import FinancialControls from './FinancialControls';
import OtherDetailsControls from './OtherDetailsControls';

export default function EventManager({ isOpen, onClose, eventData }) {
  // 1. ALL State Hooks must go here at the very top
  // Top-Level State Hooks for ALL editable fields
  const [eventStatus, setEventStatus] = useState(eventData?.eventStatus || 'Pending');
  const [auditNote, setAuditNote] = useState('');

  // Client Contact Details States
  const [clientName, setClientName] = useState(eventData?.clientName || '');
  const [eventDate, setEventDate] = useState(eventData?.eventDate || '');
  const [eventSize, setEventSize] = useState(eventData?.eventSize || '');
  const [clientPhone, setClientPhone] = useState(eventData?.clientPhone || '');
  const [clientEmail, setClientEmail] = useState(eventData?.clientEmail || '');

  // Event Details State (passed down to EventDetailsControls as props)
  const [eventTime, setEventTime] = useState(eventData?.eventTime || '');
  const [eventTitle, setEventTitle] = useState(eventData?.eventTitle || '');
  const [eventType, setEventType] = useState(eventData?.eventType || '');
  const [eventVenueName, setEventVenueName] = useState(eventData?.eventVenueName || '');
  const [eventVenueAddress, setEventVenueAddress] = useState(eventData?.eventVenueAddress || '');

  // Financial States (passed down to FinancialControls as props)
  const [quotedPrice, setQuotedPrice] = useState(eventData?.eventQuotePrice || '');
  const [agreedPrice, setAgreedPrice] = useState(eventData?.eventAgreedPrice || '');
  const [depositRequired, setDepositRequired] = useState(eventData?.eventDeposit || '');
  const [isDepositSatisfiedChecked, setIsDepositSatisfied] = useState(eventData?.isDepositSatisfied || false);

  // Other Details State (passed down to OtherDetailsControls as props)
  const [imageURL, setImageURL] = useState(eventData?.imageURL || '');
  const [ticketURL, setTicketURL] = useState(eventData?.ticketURL || '');
  const [eventOverview, setEventOverview] = useState(eventData?.eventOverview || '');

  useEffect(() => {
    if (eventData) {
      setEventStatus(eventData.eventStatus || 'Pending');
      setEventDate(eventData.eventDate || '');
      setEventSize(eventData.eventSize || '');
      setClientName(eventData.clientName || '');
      setClientPhone(eventData.clientPhone || '');
      setClientEmail(eventData.clientEmail || '');
      setEventTime(eventData.eventTime || '');
      setEventTitle(eventData.eventTitle || '');
      setEventType(eventData.eventType || '');
      setEventVenueName(eventData.eventVenueName || '');
      setEventVenueAddress(eventData.eventVenueAddress || '');
      setQuotedPrice(eventData.eventQuotePrice || '');
      setAgreedPrice(eventData.eventAgreedPrice || '');
      setDepositRequired(eventData.eventDeposit || '');
      setIsDepositSatisfied(eventData.isDepositSatisfied || false);
      setImageURL(eventData.imageURL || '');
      setTicketURL(eventData.ticketURL || '');
      setEventOverview(eventData.eventOverview || '');
      setAuditNote(''); // Clears the audit note for the new record
    }
  }, [eventData]);

  // 2. Early return strictly AFTER hooks
  if (!isOpen || !eventData) return null;

  // 3. The Handler Function
  const handleSaveUpdate = async () => {
    try {
      // Falls back to 'Admin' if Firebase Auth isn't active on this demo yet
      let activeUser = 'Admin';
      try {
        // Capture the Active User
        const auth = getAuth();
        if (auth && auth.currentUser) {
          activeUser = auth.currentUser.displayName || auth.currentUser.email || 'Admin';
        }
      } catch (authError) {
        console.warn("Firebase Auth not detected. Defaulting to 'Admin'.");
      }

      // 1. Detect Changes (Change Data Capture)
      const changes = [];
      // 1. Core Status
      if (eventStatus !== (eventData.eventStatus || 'Pending')) changes.push(`Status to "${eventStatus}"`);
      // 2. Client Contact
      if (clientName !== (eventData.clientName || '' || 'Unknown')) changes.push(`Contact Name to "${clientName}"`);
      if (clientPhone !== (eventData.clientPhone || '' || 'Unknown')) changes.push(`Contact Phone to "${clientPhone}"`);
      if (clientEmail !== (eventData.clientEmail || '' || 'Unknown')) changes.push(`Contact Email to "${clientEmail}"`);
      // 3. Event Details
      if (eventTitle !== (eventData.eventTitle || '' || 'TBD')) changes.push(`Event Title to "${eventTitle}"`);
      if (eventType !== (eventData.eventType || '')) changes.push(`Event Type to "${eventType}"`);
      if (eventDate !== (eventData.eventDate || '' || 'TBD')) changes.push(`Event Date to "${eventDate}"`);
      if (eventTime !== (eventData.eventTime || '' || 'TBD')) changes.push(`Event Time to "${eventTime}"`);
      if (Number(eventSize) !== (eventData.eventSize || 0)) changes.push(`Event Size to "${eventSize}"`);
      if (eventVenueName !== (eventData.eventVenueName || '')) changes.push(`Venue to "${eventVenueName}"`);
      if (eventVenueAddress !== (eventData.eventVenueAddress || '')) changes.push(`Venue Address to "${eventVenueAddress}"`);
      // 4. Financials
      if (Number(quotedPrice) !== (eventData.eventQuotePrice || 0)) changes.push(`Quoted Price to $${quotedPrice}`);
      if (Number(agreedPrice) !== (eventData.eventAgreedPrice || 0)) changes.push(`Agreed Price to $${agreedPrice}`);
      if (Number(depositRequired) !== (eventData.eventDeposit || 0)) changes.push(`Deposit Required to $${depositRequired}`);
      if (isDepositSatisfiedChecked !== (eventData.isDepositSatisfied || false)) changes.push(`IsDepositSatisfied to ${isDepositSatisfiedChecked}`);
      // 5. Other Details
      if (imageURL !== (eventData.imageURL || '')) changes.push(`Image URL updated`);
      if (ticketURL !== (eventData.ticketURL || '')) changes.push(`Ticket URL updated`);
      if (eventOverview !== (eventData.eventOverview || '')) changes.push(`Overview updated`);
      // You can replicate the 'if' statement above for any other fields you want tracked strictly.

      // 2. Format the Final Audit String
      const systemLog = changes.length > 0
        ? `System: Updated ${changes.join(', ')}.`
        : 'System: Record saved with no tracked field changes.';

      const finalAuditNote = auditNote.trim()
        ? `${systemLog} | User Note: "${auditNote.trim()}"`
        : systemLog;

      // 3. Execute Database Write
      // Targets 'bookings' to match your EventsPipelineDashboard listener
      const eventRef = doc(db, 'bookings', eventData.id);

      await updateDoc(eventRef, {
        // 1. Core Status
        eventStatus: eventStatus,
        auditNote: auditNote,
        // 2. Client Contact
        clientName: clientName,
        clientPhone: clientPhone,
        clientEmail: clientEmail,
        // 3. Event Details
        eventTitle: eventTitle,
        eventType: eventType,
        eventDate: eventDate,
        eventTime: eventTime,
        eventSize: Number(eventSize),
        eventVenueName: eventVenueName,
        eventVenueAddress: eventVenueAddress,
        // 4. Financials
        eventQuotePrice: Number(quotedPrice),
        eventAgreedPrice: Number(agreedPrice),
        eventDeposit: Number(depositRequired),
        isDepositSatisfied: isDepositSatisfiedChecked,
        // 5. Other Details
        imageURL: imageURL,
        ticketURL: ticketURL,
        eventOverview: eventOverview,
        // 6. System Data
        lastModified: new Date(),
        // Appends to the history array instead of overwriting
        statusHistory: arrayUnion({
          status: eventStatus,
          note: finalAuditNote,
          user: activeUser, // Injects the user dynamically
          timestamp: new Date()
        })
      });

      console.log("Database synced and history logged successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // const inputStyle = { width: '100%', padding: '0.5rem', backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#FFFFFF', borderRadius: '0.25rem', fontSize: '0.875rem', outline: 'none', marginTop: '0.25rem' };

  // 4. The UI Render
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, zIndex: 110, width: '100%', maxWidth: '28rem', backgroundColor: '#1a1a1a', boxShadow: '-10px 0 25px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', padding: '1rem 1.5rem', borderBottom: '1px solid #333' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FFFFFF' }}>{eventData.clientName}</h2>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', marginTop: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#854d0e', backgroundColor: '#fef08a', borderRadius: '9999px' }}>
              {eventData.eventStatus}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#9ca3af', cursor: 'pointer', fontWeight: 'bold' }}>
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, padding: '1rem 1.5rem', overflowY: 'auto' }}>

          {/* AI Source Block */}
          <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#262626', borderRadius: '0.375rem', border: '1px solid #333' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#9CA3AF', textTransform: 'uppercase' }}>AI Intake Source</span>
            <p style={{ fontSize: '0.875rem', color: '#D1D5DB', fontFamily: 'monospace' }}>
              "{eventData.rawMessage}"
            </p>
          </div>

          {/* Client Contact Controls Section */}
          <ClientContactControls
            clientName={clientName} setClientName={setClientName}
            clientPhone={clientPhone} setClientPhone={setClientPhone}
            clientEmail={clientEmail} setClientEmail={setClientEmail}
            requestDate={eventData.createdAt}
          />

          {/* Event Details Controls Section */}
          <EventDetailsControls
            eventTitle={eventTitle} setEventTitle={setEventTitle}
            eventType={eventType} setEventType={setEventType}
            eventDate={eventDate} setEventDate={setEventDate}
            eventTime={eventTime} setEventTime={setEventTime}
            eventSize={eventSize} setEventSize={setEventSize}
            eventVenueName={eventVenueName} setEventVenueName={setEventVenueName}
            eventVenueAddress={eventVenueAddress} setEventVenueAddress={setEventVenueAddress}
          />

          {/* Financial Controls Section */}
          <FinancialControls
            quotedPrice={quotedPrice} setQuotedPrice={setQuotedPrice}
            agreedPrice={agreedPrice} setAgreedPrice={setAgreedPrice}
            depositRequired={depositRequired} setDepositRequired={setDepositRequired}
            isDepositSatisfiedChecked={isDepositSatisfiedChecked} setIsDepositSatisfied={setIsDepositSatisfied}
          />

          {/* Other Details Controls Section */}
          <OtherDetailsControls
            imageURL={imageURL} setImageURL={setImageURL}
            ticketURL={ticketURL} setTicketURL={setTicketURL}
            eventOverview={eventOverview} setEventOverview={setEventOverview}
          />
        </div>

        {/* Sticky Footer */}
        <div style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333', display: 'flex', flexDirection: 'column' }}>

          <div style={{ padding: '1rem 1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                Next Stage
              </label>
              <select
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #444', borderRadius: '0.375rem', fontSize: '0.875rem', backgroundColor: '#262626', color: '#FFFFFF', outline: 'none' }}
              >
                <option value="Pending">Pending</option>
                <option value="Quote Sent">Quote Sent</option>
                <option value="Negotiating">Negotiating</option>
                <option value="Approved">Approved</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                Audit Note
              </label>
              <textarea
                value={auditNote}
                onChange={(e) => setAuditNote(e.target.value)}
                rows="2"
                placeholder="e.g., Client renegotiated for $800 instead of $1000"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #444', borderRadius: '0.375rem', fontSize: '0.875rem', backgroundColor: '#262626', color: '#FFFFFF', outline: 'none', resize: 'none' }}
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', backgroundColor: '#1a1a1a' }}>
            <button onClick={onClose} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#D1D5DB', backgroundColor: 'transparent', border: '1px solid #444', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleSaveUpdate} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#000000', backgroundColor: '#EAB308', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Save & Update
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}