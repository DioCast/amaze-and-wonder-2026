import FinancialControls from './FinancialControls';

export default function EventManager({ isOpen, onClose, eventData }) {
  if (!isOpen || !eventData) return null;

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

          {/* Core Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Date</label>
              <p style={{ fontWeight: '600', color: '#FFFFFF' }}>{eventData.eventDate}</p>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audience</label>
              <p style={{ fontWeight: '600', color: '#FFFFFF' }}>{eventData.eventSize}</p>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
              <p style={{ fontWeight: '600', color: '#FFFFFF' }}>{eventData.clientPhone}</p>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <p style={{ fontWeight: '600', color: '#FFFFFF', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={eventData.clientEmail}>
                {eventData.clientEmail}
              </p>
            </div>
          </div>

          {/* Financial Controls Section */}
          <FinancialControls eventData={eventData} />

        </div>

        {/* Sticky Footer */}
        <div style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333', display: 'flex', flexDirection: 'column' }}>

          <div style={{ padding: '1rem 1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#D1D5DB', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                Next Stage
              </label>
              <select
                defaultValue={eventData.eventStatus}
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
            <button style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#000000', backgroundColor: '#EAB308', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Save & Update
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}