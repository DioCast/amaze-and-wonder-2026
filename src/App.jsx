import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, ChevronDown, Mail, Send, Menu, X, ArrowUp } from 'lucide-react';

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showPromo, setShowPromo] = useState(false);

  // Trigger the Pop-Up 2 seconds after loading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPromo(false); // set to true to activaate
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xqearynr", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Thank you! Your message has been sent.');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'magic-school', label: 'Magic School' },
    { id: 'fundraising', label: 'Fundraising' },
    { id: 'contact', label: 'Contact' }
  ];

  // DYNAMIC STYLES CONSTANTS
  const isScrolled = scrollY > 50;
  const navBackground = isScrolled ? 'rgba(0,0,0,0.95)' : 'transparent';
  // We set Left/Right padding to 0 here so CSS can handle it
  const navPadding = isScrolled ? '0.75rem 0' : '1.5rem 0';
  const logoHeight = isScrolled ? '75px' : 'clamp(100px, 15vw, 180px)';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#232121', color: '#FFFFFF' }}>

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: navBackground,
          padding: navPadding,
          transition: 'all 0.4s ease-in-out',
        }}
      >
        <div className="nav-container">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img
              src="/images/logo.png"
              alt="Amaze And Wonder | Magic By Anjo"
              style={{
                height: logoHeight,
                width: 'auto',
                transition: 'height 0.4s ease-in-out'
              }}
            />
          </button>

          {/* Right Side Container */}
          <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* Desktop Navigation Links */}
            <div className="desktop-nav" style={{ marginRight: '2rem' }}>
              {navLinks.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    background: 'none', border: 'none', color: '#FFFFFF', fontSize: '14px',
                    cursor: 'pointer', textTransform: 'capitalize', fontWeight: '500'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#EAB308')}
                  onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://facebook.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF' }}>
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF' }}>
                <Instagram size={24} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            {navLinks.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  background: 'none', border: 'none', color: '#FFFFFF',
                  fontSize: '1.5rem', cursor: 'pointer', textTransform: 'capitalize',
                  padding: '1rem'
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          backgroundImage: 'url(/images/hero-background.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          paddingTop: '80px', paddingLeft: '1rem', paddingRight: '1rem'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ textAlign: 'center', zIndex: 10, padding: '0 1.5rem', marginBottom: '2rem' }}>

          {/* 1. Main Title */}
          <h1 className="abril-fatface" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', marginBottom: '0.5rem', color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: '1.1' }}>
            AMAZE AND WONDER
          </h1>

          {/* 2. "Magic By Anjo" Signature */}
          <p className="forum" style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#EAB308',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
            fontWeight: 900,
            letterSpacing: '0.05em'
          }}>
            Magic By Anjo
          </p>

          {/* 3. The Tagline */}
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#E5E7EB', marginBottom: '3rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            THE ESSENTIAL MAGIC EXPERIENCE
          </p>

          <button
            onClick={() => scrollToSection('contact')}
            className="gold-button"
            style={{
              padding: '1rem 2.5rem', borderRadius: '9999px',
              fontSize: '1.125rem', fontWeight: 'bold',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Get In Touch
          </button>
        </div>
        <button onClick={() => scrollToSection('about')} className="animate-bounce" style={{ position: 'absolute', bottom: '2rem', zIndex: 10, background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <ChevronDown style={{ width: '48px', height: '48px', color: '#FFFFFF' }} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '6rem 1.5rem', backgroundColor: '#232121' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div className="responsive-row">
            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              <h2 className="forum" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FFFFFF' }}>About</h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem', color: '#D1D5DB' }}>
                Anjo "Tony" Sanchez is a professional magician for hire in San Diego, CA.
                His love for magic started at the young age of 14. He was a Jr. Member of
                the Magic Castle and when he turned 21 became a performing magician member
                of the Magic Castle in Hollywood, CA.
              </p>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem', color: '#D1D5DB' }}>
                Anjo believes that magic is a catalyst that brings people together to enjoy
                a magical social experience. With the current global conditions virtual magic
                shows became a necessity. Anjo quickly realized the power of this new medium
                to bring more inclusion, equality and joy to the world.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="gold-button"
                style={{ padding: '0.75rem 2rem', borderRadius: '0.375rem', fontWeight: 'bold' }}
              >
                Check Availability
              </button>
            </div>
            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              <img src="/images/tony-photo.jpg" alt="Tony Sanchez" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Watch & Learn Section */}
      <section id="magic-school" style={{ padding: '6rem 1.5rem', backgroundImage: 'url(/images/magic-school-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(35, 33, 33, 0.85)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="forum" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FFFFFF' }}>Watch & Learn</h2>
            <p style={{ fontSize: '1.5rem', color: '#D1D5DB' }}>Unlock the timeless art of magic</p>
          </div>

          <div className="responsive-row" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              <h3 className="abril-fatface" style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#D4AF37' }}>MAGIC 101</h3>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.75', marginBottom: '1.5rem', color: '#D1D5DB' }}>
                A beginner's course in the art of astonishment with Instructor <strong>Anjo Sanchez</strong>, Magician and educator.
              </p>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem', color: '#9CA3AF' }}>
                Unlock the timeless art of magic through a step-by-step course designed to gain the confidence of a true magician.
              </p>
              <button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdh3jITlDhyaJVa3hsMfWeYrfqFs9kNKSemVrhRgfZP6vK8bg/viewform', '_blank')}
                className="gold-button"
                style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', marginBottom: '3rem' }}
              >
                Enroll in Magic 101
              </button>

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #444' }}>
                <h3 className="abril-fatface" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#D4AF37' }}>Expand Your Magical Journey</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.75', marginBottom: '1.5rem', color: '#D1D5DB' }}>
                  Anjo also offers <strong style={{ color: '#FFFFFF' }}>Private Magic Lessons</strong> and <strong style={{ color: '#FFFFFF' }}>Magic Lessons for Team Building Events</strong>.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="gold-button"
                  style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              <img
                src="/images/magic101-flyer.png"
                alt="Magic 101 Flyer"
                style={{ width: '100%', maxWidth: '450px', height: 'auto', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#1a1a1a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Instagram style={{ width: '40px', height: '40px', color: '#EC4899' }} />
              <h2 className="forum" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFFFFF' }}>Follow The Magic</h2>
            </div>
            <p style={{ fontSize: '1.25rem', color: '#D1D5DB', marginBottom: '1.5rem' }}>See his latest performances and behind-the-scenes moments</p>
            <a href="https://instagram.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#EC4899', fontWeight: '600', textDecoration: 'none' }}>
              <Instagram style={{ width: '20px', height: '20px' }} />
              <span>@AnjoSanchez</span>
            </a>
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="elfsight-app-5d119a5e-364b-4186-81c5-ffa27c274879" data-elfsight-app-lazy></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://instagram.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(to right, #9333EA, #EC4899)', color: '#FFFFFF', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Fundraising Section */}
      <section id="fundraising" style={{ padding: '6rem 1.5rem', minHeight: '500px', backgroundImage: 'url(/images/fundraising-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }}></div>
        <div style={{ maxWidth: '1152px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 className="forum" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FFFFFF' }}>Fundraising <span style={{ color: '#EAB308' }}>Magic</span></h2>
          <p style={{ fontSize: '1.25rem', maxWidth: '768px', margin: '0 auto 2rem', color: '#E5E7EB' }}>
            Virtual Magic show designed to help your organization or non-profit accomplish and reach your fundraising goals
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="gold-button"
            style={{ padding: '1rem 2.5rem', borderRadius: '0.375rem', fontSize: '1.125rem', fontWeight: 'bold' }}
          >
            Find Out More
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 1.5rem', backgroundImage: 'url(/images/contact-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ maxWidth: '1152px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

          <div className="responsive-row" style={{ alignItems: 'flex-start' }}>
            <div className="text-center-mobile" style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <h2 className="forum" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FFFFFF' }}>Get In Touch</h2>
              <p style={{ marginBottom: '3rem', color: '#E5E7EB' }}>Get in touch and find out more about his work.</p>
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Mail style={{ width: '24px', height: '24px', color: '#EAB308' }} />
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>email</p>
                </div>
                <a href="mailto:magicbyanjo@gmail.com" style={{ fontSize: '1.25rem', color: '#FFFFFF', textDecoration: 'none' }}>MagicByAnjo@gmail.com</a>
              </div>
            </div>

            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Name *</label>
                      <input type="text" name="firstName" placeholder="First" value={formData.firstName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(45, 45, 45, 0.9)', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                      <input type="text" name="lastName" placeholder="Last" value={formData.lastName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(45, 45, 45, 0.9)', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Email *</label>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(45, 45, 45, 0.9)', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Phone</label>
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(45, 45, 45, 0.9)', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#D1D5DB' }}>Message</label>
                    <textarea name="message" placeholder="Message" rows="5" value={formData.message} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(45, 45, 45, 0.9)', border: '1px solid #666', borderRadius: '0.375rem', color: '#FFFFFF', outline: 'none', resize: 'none' }}></textarea>
                  </div>
                  <button
                    type="submit"
                    className="gold-button"
                    style={{ width: '100%', padding: '1rem 2rem', borderRadius: '0.375rem', fontSize: '1.125rem', fontWeight: 'bold' }}
                  >
                    <span>Submit</span>
                    <Send style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 1.5rem', backgroundColor: '#000000', borderTop: '1px solid #333' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

            {/* Column 1: Brand & Location */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <img src="/images/logo-small.png" alt="Amaze And Wonder" style={{ height: '6rem', width: 'auto', marginBottom: '1.5rem' }} />
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                The Essential Magic Experience.<br />
                Creating wonder and connection through the art of magic.
              </p>
              <p style={{ color: '#EAB308', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Based in San Diego, CA
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="forum" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>Explore</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                      onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (New!) */}
            {/* Column 3: Services (Now Clickable!) */}
            <div>
              <h3 className="forum" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>Services</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* --- NEW PROMO LINK START --- */}
                <li>
                  <button 
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdh3jITlDhyaJVa3hsMfWeYrfqFs9kNKSemVrhRgfZP6vK8bg/viewform', '_blank')}
                    style={{ 
                      background: 'none', border: 'none', color: '#EAB308', cursor: 'pointer', 
                      fontSize: '0.95rem', padding: 0, textAlign: 'left', fontWeight: 'bold', 
                      transition: 'all 0.2s',
                      lineHeight: '1.5' /* Added this so the lines breathe */
                    }}
                  >
                    ★ Magic 101 - A Beginner's Course | Starts Feb 11, 2026
                  </button>
                </li>
                {/* --- NEW PROMO LINK END --- */}
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    Corporate Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('fundraising')}
                    style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    Virtual Magic Shows
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('magic-school')}
                    style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    Private Lessons
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('magic-school')}
                    style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    Team Building Workshops
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('fundraising')}
                    style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '0.95rem', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#EAB308'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    Fundraising Events
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="forum" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>Connect</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</p>
                <a href="mailto:magicbyanjo@gmail.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1rem' }}>MagicByAnjo@gmail.com</a>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Social</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://facebook.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#EAB308'} onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}>
                    <Facebook size={24} />
                  </a>
                  <a href="https://instagram.com/anjosanchez" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#EAB308'} onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}>
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div style={{ paddingTop: '2rem', textAlign: 'center', borderTop: '1px solid #262626', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#525252' }}>
              © 2026 Amaze and Wonder - Magic By Anjo. All rights reserved.
            </p>
            <p style={{ fontSize: '0.75rem', color: '#404040' }}>
              Developed By DiMarC Digital Solutions
            </p>
          </div>
        </div>
      </footer>

      {/* Back To Top Button */}
      <button
        onClick={() => scrollToSection('top')}
        className="gold-button"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '0.75rem',
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          opacity: scrollY > 300 ? 1 : 0,
          pointerEvents: scrollY > 300 ? 'auto' : 'none',
          transition: 'all 0.3s ease',
          zIndex: 60
        }}
      >
        <ArrowUp size={24} />
      </button>

      {/* --- PROMOTIONAL POP-UP --- */}
      {showPromo && (
        <div 
          onClick={() => setShowPromo(false)} /* 1. Clicking the background closes it */
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', backdropFilter: 'blur(5px)',
            cursor: 'pointer' /* Shows hand icon on background */
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} /* 2. Clicking inside STOPS it from closing */
            style={{
              position: 'relative', backgroundColor: '#232121', 
              maxWidth: '500px', width: '100%', borderRadius: '1rem', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden',
              border: '1px solid #444', animation: 'fadeIn 0.5s ease-out',
              cursor: 'default' /* Revert cursor to normal inside the box */
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowPromo(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFF', border: 'none',
                borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', zIndex: 10
              }}
            >
              <X size={24} />
            </button>

            {/* Flyer Image */}
            <img 
              src="/images/magic101-flyer.png" 
              alt="Magic 101 Course Flyer" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Content & Action */}
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 className="abril-fatface" style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '0.5rem' }}>
                Join Magic 101!
              </h3>
              <p style={{ color: '#D1D5DB', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Starts Feb 11, 2026 in San Diego. <br/>Spots are limited!
              </p>
              <button 
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdh3jITlDhyaJVa3hsMfWeYrfqFs9kNKSemVrhRgfZP6vK8bg/viewform', '_blank')}
                className="gold-button"
                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '0.5rem' }}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;