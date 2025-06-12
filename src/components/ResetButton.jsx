import React from 'react';

export default function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '12px 20px',
        background: 'rgba(30, 30, 40, 0.7)',
        color: 'white',
        border: '1px solid rgba(100, 220, 255, 0.3)',
        borderRadius: '8px',
        fontSize: '0.95rem',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        zIndex: 10,
        animation: 'float 6s ease-in-out infinite'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(100, 220, 255, 0.2)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(30, 30, 40, 0.7)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 4v6h6M23 20v-6h-6"></path>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
      </svg>
      Reset View
    </button>
  );
}
