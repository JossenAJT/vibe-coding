

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'rgba(24,26,27,0.98)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
      padding: '0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <nav className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo placeholder, replace src with your logo if available */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e50914 60%, #232526 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 22, letterSpacing: 2 }}>MB</span>
          </div>
          <NavLink className="navbar-brand" to="/" style={{
            fontWeight: 700,
            fontSize: 22,
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Master Budget
          </NavLink>
        </div>
        <ul style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/" style={{
              fontWeight: 500,
              fontSize: 16,
              color: '#e3e3e3',
              padding: '0.5rem 0',
              borderBottom: '2px solid transparent',
              transition: 'border 0.2s, color 0.2s',
            }}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/details" style={{
              fontWeight: 500,
              fontSize: 16,
              color: '#e3e3e3',
              padding: '0.5rem 0',
              borderBottom: '2px solid transparent',
              transition: 'border 0.2s, color 0.2s',
            }}>Detailed Budget</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
