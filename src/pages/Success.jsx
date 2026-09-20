import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Download, Plus, AlertTriangle } from 'lucide-react';

const Success = () => {
  const { id } = useParams();
  
  // Fix: Use the current origin dynamically instead of a hardcoded local IP
  const qrUrl = `${window.location.origin}/user/${id}`;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #F8FAFC 0%, #E0F2FE 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: '2rem 1rem',
      overflow: 'hidden'
    }}>
      
      {/* Top Header */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '50px' }} />
          <div style={{ fontWeight: '600', fontSize: '0.75rem', color: '#0F172A', lineHeight: '1.2' }}>
            Shri Bhagubhai Mafatlal<br/>Polytechnic And College of Engineering
          </div>
        </div>
        <div className="font-serif hidden-mobile" style={{ color: '#0F52BA', fontSize: '1.5rem', lineHeight: '1.1', transform: 'rotate(-5deg)', textAlign: 'right', fontWeight: '700' }}>
          Tradition<br/>
          <span style={{ color: '#F59E0B' }}>Meets Tomorrow</span>
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '500px',
        padding: '3rem 2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        zIndex: 10,
        position: 'relative'
      }}>
        
        {/* Success Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ 
            background: '#10B981', 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <CheckCircle size={40} color="white" />
          </div>
        </div>
        
        <h1 style={{ textAlign: 'center', color: '#2563EB', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>
          Registration Successful!
        </h1>
        <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Your pass has been generated.<br/>Present this QR code at the entry gate.
        </p>

        {/* Warning Box */}
        <div style={{ 
          background: '#FEF2F2', 
          border: '1px solid #FECACA',
          color: '#B91C1C',
          padding: '1rem', 
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <AlertTriangle size={24} color="#DC2626" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
            <span style={{ fontWeight: '700' }}>Important:</span> You have to pay cash on the counter to validate this pass.
          </div>
        </div>

        {/* QR Code Container */}
        <div style={{ 
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
            <QRCodeSVG 
              value={qrUrl} 
              size={200} 
              bgColor={"#ffffff"} 
              fgColor={"#000000"} 
              level={"Q"} 
              includeMargin={false} 
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#DBEAFE', padding: '0.5rem 1rem', borderRadius: '12px', color: '#1E3A8A' }}>
             <span style={{ fontSize: '1.2rem' }}>🎟️</span>
             <div>
               <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Garba Night 2026</div>
               <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>SVKM | Student Pass</div>
             </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className="btn" 
            onClick={() => window.print()}
            style={{ background: '#2563EB', color: 'white', width: '100%', padding: '1rem', borderRadius: '9999px', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}
          >
            <Download size={20} />
            Save Pass
          </button>
          
          <Link to="/" className="btn" style={{ background: 'white', color: '#2563EB', border: '2px solid #DBEAFE', width: '100%', padding: '1rem', borderRadius: '9999px', fontSize: '1.1rem', justifyContent: 'center' }}>
            <Plus size={20} />
            Register Another
          </Link>
        </div>

        {/* Separator */}
        <div style={{ textAlign: 'center', margin: '2rem 0 1.5rem', fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ height: '1px', background: '#E2E8F0', width: '30px' }}></div>
          Let's Celebrate Together!
          <div style={{ height: '1px', background: '#E2E8F0', width: '30px' }}></div>
        </div>

        {/* Feature Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
           <div className="feature-pill" style={{ background: 'white', boxShadow: 'none' }}>
             <div className="feature-icon-wrapper music">🎵</div>
             <div>
               <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>Music</div>
               <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Feel the beats</div>
             </div>
           </div>
           <div className="feature-pill" style={{ background: 'white', boxShadow: 'none' }}>
             <div className="feature-icon-wrapper dance">👥</div>
             <div>
               <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>Dance</div>
               <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Move together</div>
             </div>
           </div>
           <div className="feature-pill" style={{ background: 'white', boxShadow: 'none' }}>
             <div className="feature-icon-wrapper celebrate">🤍</div>
             <div>
               <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>Celebrate</div>
               <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Create memories</div>
             </div>
           </div>
        </div>
        
      </div>
      
      {/* Bottom Footer Text */}
      <div className="font-serif" style={{ marginTop: '2rem', zIndex: 10, color: '#0F172A', fontSize: '2rem', transform: 'rotate(-5deg)', fontWeight: '700', textAlign: 'center' }}>
        More Than A Fest
      </div>
    </div>
  );
};

export default Success;
