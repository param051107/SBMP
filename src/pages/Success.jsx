import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Download } from 'lucide-react';

const Success = () => {
  const { id } = useParams();
  
  // Hardcoded the local network IP so it works from your phone even if you register from localhost
  const qrUrl = `http://192.168.0.239:5173/user/${id}`;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '600px', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <CheckCircle size={64} color="#34d399" />
        </div>
        
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Registration Successful!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Your pass has been generated. Present this QR code at the entry gate.
        </p>

        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          padding: '1rem', 
          borderRadius: '12px',
          marginBottom: '2rem',
          fontWeight: '500',
          fontSize: '1.1rem'
        }}>
          ⚠️ Important: You have to pay cash on the counter to validate this pass.
        </div>

        <div 
          className="glass-card" 
          style={{ 
            display: 'inline-block', 
            padding: '2rem', 
            background: 'white', 
            borderRadius: '24px',
            boxShadow: '0 0 30px rgba(255, 46, 147, 0.2)' 
          }}
        >
          <QRCodeSVG 
            value={qrUrl} 
            size={250} 
            bgColor={"#ffffff"} 
            fgColor={"#000000"} 
            level={"Q"} 
            includeMargin={false} 
          />
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => window.print()}
          >
            <Download size={20} />
            Save Pass
          </button>
          
          <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Register Another
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
