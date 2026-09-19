import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User, IdCard, BookOpen, GraduationCap, CheckCircle, XCircle } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, "registrations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          setError("User not found or invalid QR code.");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Error fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="animate-pulse" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
          Loading details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Invalid Pass</h2>
          <p style={{ color: 'var(--text-muted)' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '600px' }}>
      <div className="glass-panel" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Watermark Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          backgroundImage: 'url(/sbmp-logo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 1,
          pointerEvents: 'none'
        }} />
        {/* Header Area */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(96,165,250,0.1))',
          padding: '2rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--glass-border)',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 className="title-gradient" style={{ fontSize: '2rem', margin: 0 }}>Pass Verification</h2>
        </div>

        {/* Details Area */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <DetailItem icon={<User />} label="Full Name" value={user.name} />
            <DetailItem icon={<IdCard />} label="SAP ID" value={user.sapId} />
            <DetailItem icon={<BookOpen />} label="Branch" value={user.branch} />
            <DetailItem icon={<GraduationCap />} label="Year of Study" value={user.year} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for details row
const DetailItem = ({ icon, label, value }) => (
  <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', position: 'relative', zIndex: 2 }}>
    <div style={{ color: 'var(--accent)', background: 'rgba(59,130,246,0.1)', padding: '0.75rem', borderRadius: '12px' }}>
      {icon}
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{label}</p>
      <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)' }}>{value}</p>
    </div>
  </div>
);

export default UserDetails;
