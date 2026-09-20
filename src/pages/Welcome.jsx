import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Shirt } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  // Add dark navy theme to body when this component mounts
  useEffect(() => {
    document.body.classList.add('theme-dark-navy');
    return () => {
      document.body.classList.remove('theme-dark-navy');
    };
  }, []);

  return (
    <div className="overlay-layout animate-fade-in">
      
      {/* Top Left Header (Logo) */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
        <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '40px', background: 'white', borderRadius: '50%', padding: '2px' }} />
        <div style={{ fontWeight: '600', fontSize: '0.9rem', lineHeight: '1.2' }}>
          Shri Bhagubhai Mafatlal Polytechnic<br/>
          And College of Engineering
        </div>
      </div>
      
      {/* Top Right Decorative Text */}
      <div className="font-serif hidden-mobile" style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 10, textAlign: 'right', color: 'white', fontSize: '1.5rem', lineHeight: '1.1', transform: 'rotate(-5deg)' }}>
        Tradition<br/>
        <span style={{ color: '#FCD34D' }}>Meets Tomorrow</span>
      </div>

      {/* Center Left Decorative Text */}
      <div className="font-serif hidden-mobile" style={{ position: 'absolute', left: '4rem', top: '50%', transform: 'translateY(-50%) rotate(-5deg)', zIndex: 10, color: 'white', fontSize: '3rem', lineHeight: '1.1' }}>
        Dance<br/>
        Connect<br/>
        Celebrate
      </div>

      {/* Centered Call to Action */}
      <div className="overlay-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/register')} 
          style={{ 
            padding: '1.2rem 3rem', 
            fontSize: '1.3rem', 
            borderRadius: '9999px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)'
          }}
        >
          Get Your Garba Pass Now <span>→</span>
        </button>
        <p style={{ color: 'white', marginTop: '1.5rem', fontSize: '1rem', opacity: 0.9, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Join the biggest celebration of the year!
        </p>
      </div>

      {/* Footer Text */}
      <div className="footer-nav">
        CULTURE &nbsp;|&nbsp; COMMUNITY &nbsp;|&nbsp; CELEBRATION
      </div>

    </div>
  );
};

export default Welcome;
