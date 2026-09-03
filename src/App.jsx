import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import MainSite from './components/MainSite';
import AdminLogin from './components/AdminLogin';
import EventsPipelineDashboard from './components/EventsPipelineDashboard';
import AIBookingIntake from './components/AIBookingIntake';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents login screen flash on refresh

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const queryParams = new URLSearchParams(window.location.search);
  const showBetaPortal = queryParams.get("beta") === "active";

  if (showBetaPortal) {
    if (loading) return <div style={{ backgroundColor: '#232121', minHeight: '100vh' }} />;

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#232121', color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* Dynamic Header */}
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(0,0,0,0.95)', padding: '0.75rem 0', borderBottom: '1px solid #333' }}>
          <div className="nav-container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem' }}>
            <img src="/images/logo.png" alt="Amaze And Wonder" style={{ height: '60px', width: 'auto' }} />
            <span className="forum" style={{ color: '#EAB308', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {user ? "Amaze and Wonder - Event Dashboard" : "Amaze and Wonder - Admin Login"}
            </span>
          </div>
        </nav>

        {/* Security Wall */}
        <div style={{ paddingTop: '100px' }}>
          {user ? (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              <AIBookingIntake />
              <EventsPipelineDashboard />
            </div>
          ) : (
            <AdminLogin />
          )}
        </div>

      </div>
    );
  }

  // If ?beta=active is not in the URL, route to the public site
  return <MainSite />;
}