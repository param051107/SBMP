import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Shirt, Users, Heart } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="v3-layout animate-fade-in">
      
      <div className="v3-content-wrapper">
        {/* Navbar */}
        <nav className="v3-nav">
          <div className="v3-nav-brand">
            <img src="/svkm-logo.png" alt="SVKM Logo" />
            <div className="v3-nav-brand-text">
              Shri Bhagubhai Mafatlal Polytechnic<br/>
              And College of Engineering
            </div>
          </div>
          

          <div className="hidden-mobile">
            <button className="v3-btn-gradient" onClick={() => navigate('/register')} style={{ padding: '0.5rem 1.5rem' }}>
              Register Now
            </button>
          </div>
        </nav>

        {/* Main Hero Section */}
        <div className="v3-hero">
          <div className="v3-subtitle">Welcome to</div>
          <div className="v3-title-sub">
            Shri Bhagubhai Mafatlal Polytechnic<br/>
            And College of Engineering
          </div>
          
          <div className="v3-title-main">
            <span onClick={() => navigate('/admin-login')} title="Admin Login">
              Garba
            </span> Registration
          </div>
          
          <div className="v3-description">
            Join us for an unforgettable evening of traditional music, energetic
            dance, and festive celebrations. Experience the magic of Navratri!
          </div>

          {/* Info Cards */}
          <div className="v3-info-cards">
            <div className="v3-info-card">
              <div className="v3-info-icon pink">
                <Calendar size={20} />
              </div>
              <div>
                <div className="v3-info-text-title">Date & Time</div>
                <div className="v3-info-text-sub">To Be Revealed Soon</div>
              </div>
            </div>

            <div className="v3-info-card">
              <div className="v3-info-icon orange">
                <MapPin size={20} />
              </div>
              <div>
                <div className="v3-info-text-title">Venue</div>
                <div className="v3-info-text-sub">Big Seminar Hall</div>
              </div>
            </div>

            <div className="v3-info-card">
              <div className="v3-info-icon purple">
                <Shirt size={20} />
              </div>
              <div>
                <div className="v3-info-text-title">Dress Code</div>
                <div className="v3-info-text-sub">Traditional Garba Attire</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
            <button className="v3-btn-gradient" onClick={() => navigate('/register')} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Register Now <span style={{ marginLeft: '0.5rem' }}>→</span>
            </button>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.7, paddingLeft: '1rem' }}>
              LET'S CELEBRATE TOGETHER
            </div>
          </div>

        </div>
      </div>

      {/* Footer Wave */}
      <div className="v3-footer-wave">
        <div className="v3-footer-features">
          <div className="v3-footer-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            <span>TRADITION</span>
          </div>
          <div className="v3-footer-feature">
            <Users size={24} />
            <span>TALENT</span>
          </div>
          <div className="v3-footer-feature">
            <Heart size={24} />
            <span>TOGETHER</span>
          </div>
        </div>
        
        <div className="v3-footer-script">
          The Spirit of Navratri Lives Here
        </div>
      </div>

    </div>
  );
};

export default Welcome;

