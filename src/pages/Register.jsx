import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Sparkles, IdCard, User, Book, GraduationCap } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    sapId: '',
    name: '',
    branch: '',
    year: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        ...formData,
        isPaid: false,
        createdAt: serverTimestamp()
      });
      
      navigate(`/success/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to register. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="split-layout animate-fade-in">
      
      {/* Left Form Side */}
      <div className="split-left">
        <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '3rem 2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
               <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '70px', objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--navy-dark)' }}>
              Garba Night <span style={{ color: 'var(--accent)' }}>2026</span>
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Join the biggest celebration of the year! <Sparkles size={16} style={{ display: 'inline', color: '#F59E0B' }} /></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="sapId">SAP ID</label>
              <div className="input-wrapper">
                <IdCard size={20} className="input-icon" />
                <input 
                  type="text" 
                  id="sapId"
                  name="sapId"
                  className="glass-input" 
                  placeholder="e.g. 500123456" 
                  value={formData.sapId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="glass-input" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="branch">Branch</label>
              <div className="input-wrapper">
                <Book size={20} className="input-icon" />
                <select 
                  id="branch"
                  name="branch"
                  className="glass-input" 
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>Select your branch</option>
                  <option value="AIML">AIML</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Computer">Computer</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="year">Year of Study</label>
              <div className="input-wrapper">
                <GraduationCap size={20} className="input-icon" />
                <select 
                  id="year"
                  name="year"
                  className="glass-input" 
                  value={formData.year}
                  onChange={handleChange}
                  required
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>Select your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', fontSize: '1.1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Get Pass →'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Let's celebrate together! 💃 🕺
            </div>
          </form>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="split-right">
        {/* We use a CSS gradient as fallback if placeholder image is missing */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'url(/garba-bg.jpg) no-repeat center center',
          backgroundSize: 'cover',
          opacity: 0.9
        }}></div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
           <h2 className="font-serif" style={{ fontSize: '4rem', color: 'white', lineHeight: '1.1', textShadow: '0 4px 20px rgba(0,0,0,0.2)', transform: 'rotate(-5deg)' }}>
             Dance<br/>Connect<br/>Celebrate
           </h2>
        </div>
        
        <div style={{ position: 'absolute', bottom: '2rem', color: 'white', fontSize: '0.9rem', opacity: 0.9, letterSpacing: '0.05em' }}>
          SVKM | Tradition • Talent • Together
        </div>
      </div>

    </div>
  );
};

export default Register;
