import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, User, ArrowLeft, Eye } from 'lucide-react';

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Rate limiting state
  const [isLocked, setIsLocked] = useState(false);
  // Master unlock state
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // If the user navigates back to the login page, log them out automatically
    localStorage.removeItem('adminName');
  }, []);

  useEffect(() => {
    // Check if we are currently locked out
    const storedLockout = localStorage.getItem('adminLocked');
    if (storedLockout === 'true') {
      setIsLocked(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (!adminName.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (password === 'SBMP@123') {
        // Success!
        localStorage.setItem('adminName', adminName.trim());
        localStorage.removeItem('adminLoginAttempts');
        navigate('/admin');
      } else {
        throw new Error('Incorrect password.');
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      handleFailedAttempt(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFailedAttempt = (customErrorMessage) => {
    const currentAttempts = parseInt(localStorage.getItem('adminLoginAttempts') || '0', 10);
    const newAttempts = currentAttempts + 1;
    
    if (newAttempts >= 3) {
      localStorage.setItem('adminLocked', 'true');
      setIsLocked(true);
      setError('');
      
      fetch("https://formsubmit.co/ajax/3a7ec837f6fb7bd0a7982cf30514ab8d", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "🚨 SECURITY ALERT: Garba Admin Locked",
            message: "Someone failed to login 3 times. The login page is permanently locked on their device."
        })
      }).catch(err => console.error("Error sending alert", err));

    } else {
      localStorage.setItem('adminLoginAttempts', newAttempts.toString());
      setError(`${customErrorMessage || 'Incorrect password.'} You have ${3 - newAttempts} attempt(s) left.`);
    }
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!unlockPassword.trim()) {
      setUnlockError('Please enter a master password');
      return;
    }
    
    if (unlockPassword === 'param@123' || unlockPassword === 'Vrinda@123') {
      setIsLocked(false);
      localStorage.removeItem('adminLocked');
      localStorage.removeItem('adminLoginAttempts');
      setError('');
      setUnlockError('');
      setUnlockPassword('');
    } else {
      setUnlockError('Incorrect master password');
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
             <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '70px', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.2rem' }}>
            <span style={{ color: 'var(--navy-dark)' }}>Admin</span> <span style={{ color: 'var(--secondary)' }}>Login</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Access the Garba Night 2026 Portal</p>
        </div>

        {isLocked ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Security Lockout</h3>
            <p style={{ color: 'var(--text-muted)' }}>This device has been permanently locked.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>An alert email has been sent to the administrator.</p>
            
            <form onSubmit={handleUnlock} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="password"
                className="glass-input"
                placeholder="Master Password"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                style={{ textAlign: 'center', paddingLeft: '1rem' }}
              />
              {unlockError && <div style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{unlockError}</div>}
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                Force Unlock
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {error}
              </div>
            )}
            
            <div className="input-group">
              <label className="input-label"><User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> Your Name</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="E.g. Param" 
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label"><User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> Admin Email</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input 
                  type="email" 
                  className="glass-input" 
                  placeholder="E.g. admin@sbmp.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label"><KeyRound size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> Password</label>
              <div className="input-wrapper">
                <KeyRound size={20} className="input-icon" />
                <input 
                  type="password" 
                  className="glass-input" 
                  placeholder="Enter admin password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Eye size={20} style={{ position: 'absolute', right: '1rem', color: '#94A3B8', cursor: 'pointer' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', marginTop: '1rem', fontSize: '0.9rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--secondary)' }} />
                <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>Remember me</span>
              </label>
              <span style={{ color: 'var(--secondary)', fontWeight: '600', cursor: 'pointer' }}>Forgot password?</span>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}
            >
              {loading ? 'Verifying...' : 'Login →'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
              <hr style={{ flex: 1, borderTop: '1px solid #E2E8F0', borderBottom: 'none' }} />
              <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>or</span>
              <hr style={{ flex: 1, borderTop: '1px solid #E2E8F0', borderBottom: 'none' }} />
            </div>

            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/')}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', color: 'var(--navy-dark)', borderColor: '#E2E8F0' }}
            >
              <ArrowLeft size={18} /> Back to Home
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
