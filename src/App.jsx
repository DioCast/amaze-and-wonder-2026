import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import MainSite from './components/MainSite';
import AdminLogin from './components/AdminLogin';
import EventsPipelineDashboard from './components/EventsPipelineDashboard';
import AIBookingIntake from './components/AIBookingIntake';
import UpcomingEventsGrid from './components/UpcomingEventsGrid';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIdleWarning, setShowIdleWarning] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setShowIdleWarning(false);
      return;
    }

    let warningTimer;
    let logoutTimer;
    const WARNING_DELAY = 9 * 60 * 1000; // 9 minutes
    const LOGOUT_DELAY = 1 * 60 * 1000; // 1 minute after warning

    const resetTimers = () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);

      // Do not reset automatically if the warning modal is currently visible
      // The user must explicitly click the button to stay logged in.
      if (document.getElementById('idle-warning-modal')) return;

      warningTimer = setTimeout(() => {
        setShowIdleWarning(true);

        logoutTimer = setTimeout(() => {
          handleSignOut();
        }, LOGOUT_DELAY);
      }, WARNING_DELAY);
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimers));
    resetTimers();

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimers));
    };
  }, [user]);

  // Signs the current user out and triggers the AuthState change to show the login screen
  const handleSignOut = async () => {
    try {
      setShowIdleWarning(false);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const showBetaPortal = queryParams.get("beta") === "active";

  if (showBetaPortal) {
    if (loading) return <div className="min-h-screen bg-[#232121]" />;

    return (
      <div className="min-h-screen bg-[#232121] text-white font-sans">

        {/* Idle Warning Modal */}
        {showIdleWarning && (
          <div id="idle-warning-modal" className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[#262626] border border-[#444] rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-[#EAB308] mb-3">Session Expiring</h3>
              <p className="text-gray-300 mb-6">You have been idle for 9 minutes. For your security, you will be automatically signed out in 60 seconds.</p>
              <button
                onClick={() => setShowIdleWarning(false)}
                className="w-full py-3 bg-[#EAB308] text-black font-bold rounded-md hover:bg-yellow-400 transition-colors"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Header */}
        <nav className="fixed top-0 w-full z-50 bg-black/95 py-3 border-b border-[#333]">
          <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/images/logo.png" alt="Amaze And Wonder" className="h-[60px] w-auto" />
              <span className="forum text-[#EAB308] text-xl font-bold">
                {user ? "Amaze and Wonder - Beta Event Dashboard" : "Amaze and Wonder - Admin Login"}
              </span>
            </div>

            {/* Sign Out Button (Only renders if a user is actively logged in) */}
            {user && (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-semibold text-gray-300 bg-[#262626] hover:bg-[#333] hover:text-white rounded-md transition-colors border border-[#444]"
              >
                Sign Out
              </button>
            )}
          </div>
        </nav>

        {/* Security Wall */}
        <div className="pt-[100px]">
          {user ? (
            <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col gap-6">
              <UpcomingEventsGrid />
              <EventsPipelineDashboard />
              <AIBookingIntake />
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