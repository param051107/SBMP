import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ShieldAlert, KeyRound, User } from 'lucide-react';

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
      
      // Send Email Alert via FormSubmit (Using the secure random string instead of naked email)
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
      // Clear the lock
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
    <div className="container animate-fade-in" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 className="title-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Admin Login
        </h2>

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
                placeholder="Master Password to unlock"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                style={{ textAlign: 'center' }}
              />
              {unlockError && <div style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{unlockError}</div>}
              <button type="submit" className="btn" style={{ padding: '0.5rem', fontSize: '0.9rem' }}>
                Force Unlock
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label><User size={16} /> Your Name</label>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="E.g. Param" 
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label><User size={16} /> Admin Email</label>
              <input 
                type="email" 
                className="glass-input" 
                placeholder="E.g. admin@sbmp.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label><KeyRound size={16} /> Password</label>
              <input 
                type="password" 
                className="glass-input" 
                placeholder="Enter admin password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn" 
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/')}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              Back to Home
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
