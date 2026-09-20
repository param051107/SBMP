import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, CheckCircle, XCircle, Trash2, LogOut, Home, Users, CreditCard, Clock, Settings, UserCircle, MoreVertical } from 'lucide-react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentAdmin = localStorage.getItem('adminName');

  useEffect(() => {
    if (currentAdmin) {
      setIsAuthenticated(true);
    } else {
      navigate('/admin-login', { replace: true });
    }
  }, [currentAdmin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminName');
    navigate('/admin-login');
  };

  useEffect(() => {
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const togglePaymentStatus = async (userId, currentStatus, userName, method = "cash") => {
    const action = currentStatus ? "unpaid" : `paid (${method})`;
    if (!window.confirm(`Are you sure you want to mark ${userName} as ${action}?`)) {
      return;
    }
    
    try {
      const currentAdmin = localStorage.getItem('adminName') || 'Unknown';
      const userRef = doc(db, "registrations", userId);
      
      const updateData = { isPaid: !currentStatus };
      if (!currentStatus) {
        updateData.markedPaidBy = currentAdmin;
        updateData.paymentMethod = method;
      } else {
        updateData.markedPaidBy = null;
        updateData.paymentMethod = null;
      }
      
      await updateDoc(userRef, updateData);
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update status.");
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the registration for ${userName}?`)) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "registrations", userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete registration.");
    }
  };

  const filteredUsers = users.filter(user => {
    const search = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(search)) ||
      (user.sapId && user.sapId.toLowerCase().includes(search)) ||
      (user.branch && user.branch.toLowerCase().includes(search))
    );
  });

  if (!isAuthenticated) return null;

  const totalUsers = users.length;
  const paidUsers = users.filter(u => u.isPaid).length;
  const unpaidUsers = users.filter(u => !u.isPaid).length;
  const revenue = paidUsers * 500; // Assuming 500 per ticket

  return (
    <div className="dashboard-layout animate-fade-in">
      
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
          <img src="/svkm-logo.png" alt="SVKM" style={{ height: '40px', background: 'white', borderRadius: '50%', padding: '2px' }} />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Garba Night <span style={{ color: '#FCD34D' }}>2026</span></h2>
        </div>
        
        <ul className="sidebar-menu">
          <li className="active"><Home size={20} /> Dashboard</li>
          <li><Users size={20} /> Registrations</li>
          <li><CreditCard size={20} /> Paid Users</li>
          <li><Clock size={20} /> Unpaid Users</li>
          <li><Search size={20} /> Search</li>
        </ul>
        
        <div style={{ marginTop: 'auto' }}>
          <hr style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', margin: '1rem 0' }} />
          <ul className="sidebar-menu" style={{ marginTop: 0 }}>
            <li><Settings size={20} /> Settings</li>
            <li onClick={handleLogout} style={{ color: '#ef4444' }}><LogOut size={20} /> Logout</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)', marginBottom: '0.2rem' }}>Welcome, {currentAdmin}! 👋</h1>
            <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with Garba Night 2026</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div className="input-wrapper" style={{ width: '300px' }}>
              <Search size={18} className="input-icon" />
              <input 
                type="text" 
                className="glass-input" 
                placeholder="Search by Name, SAP ID, Branch..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '9999px', padding: '0.6rem 1rem 0.6rem 2.5rem' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {currentAdmin ? currentAdmin.charAt(0).toUpperCase() : 'A'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{currentAdmin}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SVKM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stats-card">
            <div style={{ background: '#DBEAFE', padding: '1rem', borderRadius: '12px', color: '#2563EB' }}><Users size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Total Registrations</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--navy-dark)' }}>{totalUsers}</div>
            </div>
          </div>
          <div className="stats-card">
            <div style={{ background: '#D1FAE5', padding: '1rem', borderRadius: '12px', color: '#059669' }}><CreditCard size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Paid Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--navy-dark)' }}>{paidUsers}</div>
            </div>
          </div>
          <div className="stats-card">
            <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '12px', color: '#D97706' }}><Clock size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Unpaid Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--navy-dark)' }}>{unpaidUsers}</div>
            </div>
          </div>
          <div className="stats-card">
            <div style={{ background: '#F3E8FF', padding: '1rem', borderRadius: '12px', color: '#9333EA' }}><span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹</span></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Revenue Collected</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--navy-dark)' }}>₹{revenue}</div>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-dark)' }}><Users size={18} /> Recent Registrations</h3>
            <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>+ Add User</button>
          </div>
          
          {loading ? (
             <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading registrations...</div>
          ) : (
            <div className="table-container" style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>SAP ID</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Payment Status</th>
                    <th>Marked By</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No registrations found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td style={{ fontWeight: '500', color: 'var(--navy-dark)' }}>{user.sapId}</td>
                        <td style={{ fontWeight: '600' }}>{user.name}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{user.branch}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{user.year}</td>
                        <td>
                          {user.isPaid ? (
                            <span className="badge badge-success">Paid {user.paymentMethod ? `(${user.paymentMethod})` : ''}</span>
                          ) : (
                            <span className="badge badge-warning">Unpaid</span>
                          )}
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {user.isPaid && user.markedPaidBy ? user.markedPaidBy : '-'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            {user.isPaid ? (
                              <button 
                                className="btn" 
                                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', background: '#FEE2E2', color: '#DC2626', border: 'none' }}
                                onClick={() => togglePaymentStatus(user.id, true, user.name)}
                              >
                                Unmark
                              </button>
                            ) : (
                              <>
                                <button 
                                  className="btn btn-primary" 
                                  style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                                  onClick={() => togglePaymentStatus(user.id, false, user.name, 'cash')}
                                >
                                  Cash
                                </button>
                                <button 
                                  className="btn" 
                                  style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', background: '#10B981', color: 'white' }}
                                  onClick={() => togglePaymentStatus(user.id, false, user.name, 'online')}
                                >
                                  Online
                                </button>
                              </>
                            )}
                            <button 
                              className="btn" 
                              style={{ padding: '0.4rem', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}
                              onClick={() => deleteUser(user.id, user.name)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                        <td><MoreVertical size={16} color="#94A3B8" style={{ cursor: 'pointer' }}/></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Admin;
