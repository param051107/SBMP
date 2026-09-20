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
    <div className="overlay-layout animate-fade-in">
      


      {/* Centered Registration Card */}
      <div className="overlay-content">
        <div className="glass-panel" style={{ width: '100%', padding: '3rem 2.5rem', background: 'white', borderRadius: '24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ color: '#0F52BA', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Sparkles size={12} color="#F59E0B" /> NAVRATRI CELEBRATION <Sparkles size={12} color="#F59E0B" />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#0A1128', fontWeight: '800' }}>
              Garba Night <span style={{ color: '#2563EB' }}>2026</span>
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>Join the biggest celebration of the year!</p>
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
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ height: '1px', background: '#E2E8F0', width: '30px' }}></div>
              Let's celebrate together! 💃 🕺
              <div style={{ height: '1px', background: '#E2E8F0', width: '30px' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
               <div className="feature-pill">
                 <div className="feature-icon-wrapper music">🎵</div>
                 <div>
                   <div style={{ fontWeight: '600' }}>Music</div>
                   <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Feel the beats</div>
                 </div>
               </div>
               <div className="feature-pill">
                 <div className="feature-icon-wrapper dance">👥</div>
                 <div>
                   <div style={{ fontWeight: '600' }}>Dance</div>
                   <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Move together</div>
                 </div>
               </div>
               <div className="feature-pill">
                 <div className="feature-icon-wrapper celebrate">🤍</div>
                 <div>
                   <div style={{ fontWeight: '600' }}>Celebrate</div>
                   <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Create memories</div>
                 </div>
               </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Text */}
      <div className="footer-nav">
        CULTURE &nbsp;|&nbsp; COMMUNITY &nbsp;|&nbsp; CELEBRATION
      </div>

    </div>
  );
};

export default Register;
