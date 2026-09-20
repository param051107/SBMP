import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, CheckCircle, XCircle, Trash2, LogOut } from 'lucide-react';

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
      
      // Update local state to reflect change instantly
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ...updateData } : user
      ));
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
      setUsers(users.filter(user => user.id !== userId));
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

  if (!isAuthenticated) {
    return null; // Prevent rendering anything if not logged in
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className="title-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              color: '#ef4444', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Search by Name, SAP ID, Branch..." 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Registrations</p>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{users.length}</h2>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid #10b981' }}>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Paid Users</p>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#34d399' }}>{users.filter(u => u.isPaid).length}</h2>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Unpaid Users</p>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#fbbf24' }}>{users.filter(u => !u.isPaid).length}</h2>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden' }}>
        {loading ? (
          <div className="animate-pulse" style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent)' }}>
            Loading registrations...
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>SAP ID</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>Payment Status</th>
                  <th>Marked By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td style={{ fontFamily: 'var(--mono)' }}>{user.sapId}</td>
                      <td style={{ fontWeight: '500' }}>{user.name}</td>
                      <td>{user.branch}</td>
                      <td>{user.year}</td>
                      <td>
                        {user.isPaid ? (
                          <span className="badge badge-success"><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> Paid {user.paymentMethod ? `(${user.paymentMethod})` : ''}</span>
                        ) : (
                          <span className="badge badge-warning"><XCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> Unpaid</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {user.isPaid && user.markedPaidBy ? user.markedPaidBy : '-'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {user.isPaid ? (
                            <button 
                              className="btn" 
                              style={{ 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.85rem', 
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '36px',
                                flex: 1
                              }}
                              onClick={() => togglePaymentStatus(user.id, true, user.name)}
                            >
                              Mark Unpaid
                            </button>
                          ) : (
                            <>
                              <button 
                                className="btn" 
                                style={{ 
                                  padding: '0.5rem 0.5rem', 
                                  fontSize: '0.75rem', 
                                  background: 'var(--primary)',
                                  color: 'white',
                                  border: '1px solid transparent',
                                  whiteSpace: 'nowrap',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '36px',
                                  flex: 1
                                }}
                                onClick={() => togglePaymentStatus(user.id, false, user.name, 'cash')}
                              >
                                Cash
                              </button>
                              <button 
                                className="btn" 
                                style={{ 
                                  padding: '0.5rem 0.5rem', 
                                  fontSize: '0.75rem', 
                                  background: '#10b981',
                                  color: 'white',
                                  border: '1px solid transparent',
                                  whiteSpace: 'nowrap',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '36px',
                                  flex: 1
                                }}
                                onClick={() => togglePaymentStatus(user.id, false, user.name, 'online')}
                              >
                                Online
                              </button>
                            </>
                          )}
                          <button 
                            className="btn" 
                            style={{ 
                              padding: '0', 
                              background: 'transparent',
                              color: '#ef4444',
                              border: '1px solid rgba(239, 68, 68, 0.5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '36px',
                              width: '36px'
                            }}
                            title="Delete Registration"
                            onClick={() => deleteUser(user.id, user.name)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
