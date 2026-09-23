'use client';

import React from 'react';
import { useAuth } from '@payloadcms/ui';
import './CustomAccountView.css';

export const CustomAccountView = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Generate initials for avatar
  const getInitials = (email: string) => {
    if (!email) return 'A';
    return email.substring(0, 2).toUpperCase();
  };

  const role = user?.roles?.[0] === 'admin' ? 'Super Administrator' : 'User';

  return (
    <div className="innovative-profile-wrapper">
      
      {/* Dynamic Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      
      <div className="profile-container">
        
        {/* Header / Hero Section */}
        <div className="profile-glass-card hero-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {getInitials(user?.email || '')}
            </div>
            <div className="status-indicator"></div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user?.email?.split('@')[0] || 'Admin'}</h1>
            <p className="profile-email">{user?.email}</p>
            <div className="role-badge">
              <span className="role-icon">✦</span> {role}
            </div>
          </div>

          <div className="profile-actions-top">
             <a href={`/admin/collections/users/${user.id}`} className="btn-innovative primary">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
               Edit Profile Details
             </a>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          
          {/* Stats / Info Card */}
          <div className="profile-glass-card stat-card">
            <div className="card-header">
              <h3>Account Security</h3>
            </div>
            <div className="card-body">
              <div className="stat-row">
                <span className="stat-label">Password</span>
                <span className="stat-value text-success">Secure</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Last Login</span>
                <span className="stat-value">Just now</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Access Level</span>
                <span className="stat-value highlight">{role}</span>
              </div>
              <div className="card-actions">
                 <a href={`/admin/collections/users/${user.id}`} className="btn-innovative outline">
                   Change Password
                 </a>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="profile-glass-card stat-card">
            <div className="card-header">
              <h3>System Preferences</h3>
            </div>
            <div className="card-body">
              <p className="info-text">
                Your Payload CMS interface preferences, including language and theme, can be managed in your user settings.
              </p>
              
              <div className="preference-visuals">
                 <div className="pref-box">
                    <span className="pref-icon">🌍</span>
                    <span className="pref-name">Localization</span>
                 </div>
                 <div className="pref-box">
                    <span className="pref-icon">🎨</span>
                    <span className="pref-name">Theme</span>
                 </div>
              </div>

              <div className="card-actions">
                 <button 
                   className="btn-innovative outline"
                   onClick={() => alert("Please use the language/theme toggles provided in the sidebar or edit your user profile.")}
                 >
                   Manage Preferences
                 </button>
              </div>
            </div>
          </div>

          {/* Recent Activity (Visual Placeholder for Innovation) */}
          <div className="profile-glass-card activity-card">
             <div className="card-header">
              <h3>Recent System Activity</h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot green"></div>
                <div className="activity-details">
                  <p>Logged into Payload Admin</p>
                  <span>Today</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot orange"></div>
                <div className="activity-details">
                  <p>Updated Profile Information</p>
                  <span>Recently</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot blue"></div>
                <div className="activity-details">
                  <p>System Initialized</p>
                  <span>Initial Setup</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
