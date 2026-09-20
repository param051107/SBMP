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
    <div className="animate-fade-in" style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '50px', background: 'white', borderRadius: '50%', padding: '2px' }} />
          <div style={{ fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.2' }}>
            Shri Bhagubhai Mafatlal Polytechnic<br/>
            And College of Engineering
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
            <span style={{ color: '#FCD34D', cursor: 'pointer' }}>Home</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => navigate('/admin-login')}>About</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Events</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Contact</span>
          </div>
          <button className="btn btn-pink" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }} onClick={() => navigate('/register')}>
            Register Now
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4rem 3rem', position: 'relative' }}>
        
        {/* Left Side Content */}
        <div style={{ maxWidth: '600px', zIndex: 10 }}>
          <p style={{ color: '#FCD34D', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Welcome to
          </p>
          <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Shri Bhagubhai Mafatlal Polytechnic<br/>
            And College of Engineering
          </h1>
          
          <h2 className="font-serif" style={{ fontSize: '4.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            <span style={{ color: '#FCD34D' }}>Garba</span> Registration
          </h2>
          
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '3rem', maxWidth: '500px' }}>
            Join us for an unforgettable evening of traditional music, energetic dance, and festive celebrations. Experience the magic of Navratri!
          </p>

          {/* Info Cards */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <div className="glass-card-dark" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #EC4899, #F97316)', padding: '0.75rem', borderRadius: '12px' }}>
                <Calendar size={24} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Date & Time</div>
                <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>To Be Revealed Soon</div>
              </div>
            </div>
            
            <div className="glass-card-dark" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #F97316, #F59E0B)', padding: '0.75rem', borderRadius: '12px' }}>
                <MapPin size={24} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Venue</div>
                <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>Big Seminar Hall</div>
              </div>
            </div>

            <div className="glass-card-dark" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)', padding: '0.75rem', borderRadius: '12px' }}>
                <Shirt size={24} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Dress Code</div>
                <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>Traditional</div>
              </div>
            </div>
          </div>

          <button className="btn btn-pink" onClick={() => navigate('/register')} style={{ padding: '1rem 3rem', fontSize: '1.2rem', gap: '1rem' }}>
            Register Now <span>→</span>
          </button>
        </div>
        
        {/* Right Side Illustration Placeholder */}
        <div style={{ position: 'absolute', right: 0, top: '10%', bottom: 0, width: '50%', background: 'url(/placeholder-garba.png) no-repeat center right', backgroundSize: 'contain', zIndex: 1, opacity: 0.8 }}>
           {/* If placeholder image doesn't exist, we will use a decorative element here */}
           <div style={{ position: 'absolute', bottom: '15%', right: '10%', transform: 'rotate(-10deg)' }}>
              <h3 className="font-serif" style={{ fontSize: '3rem', lineHeight: '1', color: 'white' }}>Dance<br/>Connect<br/>Celebrate</h3>
           </div>
        </div>

      </div>

    </div>
  );
};

export default Welcome;
