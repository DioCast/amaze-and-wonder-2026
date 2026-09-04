import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import ClientContactControls from './ClientContactControls';
import EventDetailsControls from './EventDetailsControls';
import FinancialControls from './FinancialControls';
import OtherDetailsControls from './OtherDetailsControls';

export default function EventManager({ isOpen, onClose, eventData }) {
  // 1. ALL State Hooks must go here at the very top
  // Audit History
  const [showHistory, setShowHistory] = useState(false);

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
  const [paidBalance, setPaidBalance] = useState(eventData?.eventPaidBalance || ''); // New State
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
      setPaidBalance(eventData.eventPaidBalance || ''); // New Reset
      setDepositRequired(eventData.eventDeposit || '');
      setIsDepositSatisfied(eventData.isDepositSatisfied || false);
      setImageURL(eventData.imageURL || '');
      setTicketURL(eventData.ticketURL || '');
      setEventOverview(eventData.eventOverview || '');
      // Load the draft for this specific event ID, or default to empty string
      setAuditNote(localStorage.getItem(`auditNote_${eventData.id}`) || ''); // Clears the audit note for the new record
      setShowHistory(false); // Forces the panel closed on new record
    }
  }, [eventData]);

  useEffect(() => {
    if (eventData?.id) {
      if (auditNote) {
        localStorage.setItem(`auditNote_${eventData.id}`, auditNote);
      } else {
        localStorage.removeItem(`auditNote_${eventData.id}`);
      }
    }
  }, [auditNote, eventData]);

  // Automatically resets the history panel when the modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowHistory(false);
    }
  }, [isOpen]);

  // 2. Early return strictly AFTER hooks
  if (!isOpen || !eventData) return null;


  // 3. The Handler Function
  const handleSaveUpdate = async () => {
    try {
      // Falls back to 'Admin' if Firebase Auth isn't active on this demo yet
      let activeUser = 'Admin';
      try {
        // Capture the Active User
        if (auth && auth.currentUser) {
          if (auth.currentUser.displayName) {
            activeUser = auth.currentUser.displayName;
          } else if (auth.currentUser.email) {
            // Isolates the prefix before the @ symbol
            const emailPrefix = auth.currentUser.email.split('@')[0];

            // Splits by periods, capitalizes each word, and joins with a space
            activeUser = emailPrefix
              .split('.')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ');
          }
        }
      } catch (authError) {
        console.warn("Firebase Auth error. Defaulting to 'Admin'.");
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
      // 4. Financials (Change Tracker)
      if (Number(quotedPrice) !== (eventData.eventQuotePrice || 0)) changes.push(`Quoted Price to $${quotedPrice}`);
      if (Number(agreedPrice) !== (eventData.eventAgreedPrice || 0)) changes.push(`Agreed Price to $${agreedPrice}`);

      // Dynamic Paid Balance Tracker
      const oldPaidBalance = eventData.eventPaidBalance || 0;
      const newPaidBalance = Number(paidBalance) || 0;

      if (newPaidBalance !== oldPaidBalance) {
        const difference = newPaidBalance - oldPaidBalance;
        const currentAgreedPrice = Number(agreedPrice) || 0;
        const remainingBalance = currentAgreedPrice - newPaidBalance;

        const actionVerb = difference >= 0 ? "added" : "deducted";
        changes.push(`${actionVerb} $${Math.abs(difference)} to paid balance, new paid balance is $${newPaidBalance}, remaining balance is $${remainingBalance}`);
      }

      if (Number(depositRequired) !== (eventData.eventDeposit || 0)) changes.push(`Deposit Required to $${depositRequired}`);
      if (isDepositSatisfiedChecked !== (eventData.isDepositSatisfied || false)) changes.push(`IsDepositSatisfied to ${isDepositSatisfiedChecked}`);
      // 5. Other Details
      if (imageURL !== (eventData.imageURL || '')) changes.push(`Image URL to "${imageURL}"`);
      if (ticketURL !== (eventData.ticketURL || '')) changes.push(`Ticket URL to "${ticketURL}"`);
      if (eventOverview !== (eventData.eventOverview || '')) changes.push(`Overview to "${eventOverview}"`);
      // You can replicate the 'if' statement above for any other fields you want tracked strictly.

      // 2. Format the Final Audit String
      const systemLog = changes.length > 0
        ? `Updated ${changes.join(', ')}.`
        : 'Record saved with no tracked changes.';

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
        eventPaidBalance: Number(paidBalance), // New DB Field
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

      localStorage.removeItem(`auditNote_${eventData.id}`);

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
        <div className="relative p-6 border-b border-[#333]">
          {/* X Button (Standard Top Right Alignment) */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl font-bold transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Name Block (Added pr-8 to prevent text overlap with the X button) */}
          <div className="flex flex-col items-start w-full pr-8">
            {/* 1st Row: Client Name */}
            <h2 className="text-xl font-bold text-white leading-tight mb-1">
              {eventData.clientName}
            </h2>

            {/* 2nd Row: Event Name */}
            <div className="text-sm font-medium text-gray-300 leading-snug">
              {eventData.eventTitle || 'Event Title TBD'}
            </div>

            {/* 3rd Row: Exact matched yellow status badge */}
            <div className="mt-2.5">
              <span className="inline-block px-2.5 py-1 text-xs font-bold text-[#854d0e] bg-[#fef08a] rounded-full">
                {eventData.eventStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        {/* Middle Section Sandbox (Auto-fills space between header and footer) */}
        <div className="flex-1 relative overflow-x-hidden">

          {/* A. The Standard Form Fields (Base Layer) */}
          <div className="absolute inset-0 p-6 overflow-y-auto">
            {/* AI Source Block */}
            <div className="p-4 mb-6 bg-[#262626] rounded-md border border-[#333]">
              <span className="block mb-2 text-xs font-bold text-gray-400 uppercase">AI Intake Source</span>
              <p className="text-sm text-gray-300 font-mono break-words">
                "{eventData.rawMessage}"
              </p>
            </div>

            <ClientContactControls
              clientName={clientName} setClientName={setClientName}
              clientPhone={clientPhone} setClientPhone={setClientPhone}
              clientEmail={clientEmail} setClientEmail={setClientEmail}
              requestDate={eventData.createdAt}
            />

            <EventDetailsControls
              eventTitle={eventTitle} setEventTitle={setEventTitle}
              eventType={eventType} setEventType={setEventType}
              eventDate={eventDate} setEventDate={setEventDate}
              eventTime={eventTime} setEventTime={setEventTime}
              eventSize={eventSize} setEventSize={setEventSize}
              eventVenueName={eventVenueName} setEventVenueName={setEventVenueName}
              eventVenueAddress={eventVenueAddress} setEventVenueAddress={setEventVenueAddress}
            />

            <FinancialControls
              quotedPrice={quotedPrice} setQuotedPrice={setQuotedPrice}
              agreedPrice={agreedPrice} setAgreedPrice={setAgreedPrice}
              paidBalance={paidBalance} setPaidBalance={setPaidBalance}
              depositRequired={depositRequired} setDepositRequired={setDepositRequired}
              isDepositSatisfiedChecked={isDepositSatisfiedChecked} setIsDepositSatisfied={setIsDepositSatisfied}
            />

            <OtherDetailsControls
              imageURL={imageURL} setImageURL={setImageURL}
              ticketURL={ticketURL} setTicketURL={setTicketURL}
              eventOverview={eventOverview} setEventOverview={setEventOverview}
            />
          </div>

          {/* B. The Sliding History Panel (Top Layer) */}
          <div
            className={`absolute inset-0 bg-[#1a1a1a] z-50 transition-transform duration-300 ease-in-out ${showHistory ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="p-6 h-full overflow-y-auto">
              <h3 className="text-[#EAB308] font-bold uppercase text-xs tracking-wider border-b border-[#333] pb-2 mb-4">
                Audit History
              </h3>

              <div className="space-y-4">
                {eventData.statusHistory && eventData.statusHistory.length > 0 ? (
                  [...eventData.statusHistory].reverse().map((log, index) => (
                    <div key={index} className="bg-[#262626] p-3 rounded border border-[#444]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-300">{log.user}</span>
                        <span className="text-[10px] text-gray-500">
                          {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold text-[#854d0e] bg-[#fef08a] rounded-full">
                        {log.status}
                      </span>
                      {/* break-words and whitespace-pre-wrap force long URLs and notes to wrap properly */}
                      <p className="text-xs text-gray-400 leading-relaxed break-words whitespace-pre-wrap">
                        {log.note}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No history available for this record.</p>
                )}
              </div>
            </div>
          </div>

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
                <option value="Rejected">Rejected</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
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
          <div className="p-4 border-t border-[#333] flex justify-between items-center bg-[#1a1a1a]">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs font-bold text-gray-400 hover:text-[#EAB308] uppercase tracking-wider transition-colors"
            >
              {showHistory ? 'Hide History' : 'View History'}
            </button>

            <div className="flex gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-[#444] rounded hover:bg-[#262626] transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveUpdate} className="px-4 py-2 text-sm font-medium text-black bg-[#EAB308] rounded hover:bg-yellow-400 transition-colors">
                Save & Update
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}