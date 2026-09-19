import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Calendar, MapPin, Sparkles } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="container animate-fade-in" style={{ 
      maxWidth: '800px', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      
      {/* SVKM Logo */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/svkm-logo.png" 
          alt="SVKM Logo" 
          style={{ 
            height: '100px', 
            objectFit: 'contain'
          }} 
        />
      </div>

      <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>
        Shri Bhagubhai Mafatlal Polytechnic And College of Engineering
      </h1>
      <h2 
        style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem', cursor: 'pointer' }}
        onClick={() => navigate('/admin-login')}
      >
        Garba Registration
      </h2>
      
      <p style={{ 
        color: 'var(--text-muted)', 
        fontSize: '1.2rem', 
        marginBottom: '3rem',
        maxWidth: '600px',
        margin: '0 auto 3rem auto',
        lineHeight: '1.6'
      }}>
        Join us for an unforgettable evening of traditional music, energetic dance, and festive celebrations. Experience the magic of Navratri!
      </p>

      {/* Info Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={24} color="var(--primary)" />
          <h3 style={{ margin: '0.5rem 0 0 0' }}>Date & Time</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>To Be Revealed Soon</p>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={24} color="var(--accent)" />
          <h3 style={{ margin: '0.5rem 0 0 0' }}>Venue</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Big Seminar Hall</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={24} color="#10b981" />
          <h3 style={{ margin: '0.5rem 0 0 0' }}>Dress Code</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Traditional<br/>Garba Attire</p>
        </div>
      </div>

      <div>
        <button 
          className="btn" 
          style={{ fontSize: '1.2rem', padding: '1rem 3rem', boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)' }}
          onClick={() => navigate('/register')}
        >
          Register Now
        </button>
      </div>
      


    </div>
  );
};

export default Welcome;
