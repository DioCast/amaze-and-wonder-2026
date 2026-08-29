export default function FinancialControls({ eventData }) {
  return (
    <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#262626', border: '1px solid #333', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
        Financial Controls
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

        {/* Quoted Price */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' }}>Quoted Price</label>
          <div style={{ position: 'relative', marginTop: '0.25rem' }}>
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', color: '#9CA3AF', fontWeight: '500' }}>$</span>
            <input
              type="number"
              defaultValue={eventData.eventQuotePrice}
              style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 1.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none' }}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Agreed Price */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' }}>Agreed Price</label>
          <div style={{ position: 'relative', marginTop: '0.25rem' }}>
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', color: '#9CA3AF', fontWeight: '500' }}>$</span>
            <input
              type="number"
              defaultValue={eventData.eventAgreedPrice}
              style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 1.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none' }}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Deposit Required */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#D1D5DB', textTransform: 'uppercase' }}>Deposit Required</label>
          <div style={{ position: 'relative', marginTop: '0.25rem' }}>
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', color: '#9CA3AF', fontWeight: '500' }}>$</span>
            <input
              type="number"
              defaultValue={eventData.eventDeposit}
              style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 1.75rem', fontSize: '0.875rem', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#FFFFFF', borderRadius: '0.25rem', outline: 'none' }}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Deposit Cleared Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              defaultChecked={eventData.isDepositSatisfied}
              style={{ width: '1.25rem', height: '1.25rem', color: '#EAB308', borderRadius: '0.25rem' }}
            />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold', color: '#D1D5DB' }}>Deposit Cleared</span>
          </label>
        </div>

      </div>
    </div>
  );
}