import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Ticket, Sparkles } from 'lucide-react';

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
      
      // Navigate to success page with the generated document ID
      navigate(`/success/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to register. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '500px' }}>
      <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
             <img src="/svkm-logo.png" alt="SVKM Logo" style={{ height: '80px', objectFit: 'contain' }} />
          </div>
          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Garba Night 2026</h1>
          <p style={{ color: 'var(--text-muted)' }}>Join the biggest celebration of the year! <Sparkles size={16} style={{ display: 'inline', color: 'var(--secondary)' }} /></p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="sapId">SAP ID</label>
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

          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
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

          <div className="input-group">
            <label className="input-label" htmlFor="branch">Branch</label>
            <select 
              id="branch"
              name="branch"
              className="glass-input" 
              value={formData.branch}
              onChange={handleChange}
              required
              style={{ appearance: 'none' }}
            >
              <option value="" disabled style={{ color: '#000' }}>Select your branch</option>
              <option value="AIML" style={{ color: '#000' }}>AIML</option>
              <option value="Computer Science" style={{ color: '#000' }}>Computer Science</option>
              <option value="Computer" style={{ color: '#000' }}>Computer</option>
              <option value="IT" style={{ color: '#000' }}>IT</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="year">Year of Study</label>
            <select 
              id="year"
              name="year"
              className="glass-input" 
              value={formData.year}
              onChange={handleChange}
              required
              style={{ appearance: 'none' }}
            >
              <option value="" disabled style={{ color: '#000' }}>Select your year</option>
              <option value="1st Year" style={{ color: '#000' }}>1st Year</option>
              <option value="2nd Year" style={{ color: '#000' }}>2nd Year</option>
              <option value="3rd Year" style={{ color: '#000' }}>3rd Year</option>
              <option value="4th Year" style={{ color: '#000' }}>4th Year</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Get Pass'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
