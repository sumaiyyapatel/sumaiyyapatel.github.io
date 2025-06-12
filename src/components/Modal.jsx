import React from 'react';

export default function Modal({ activeSection, sectionData, onClose }) {
  const section = sectionData[activeSection];
  if (!section) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        background: 'rgba(20, 20, 30, 0.95)',
        color: '#fff',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(100, 220, 255, 0.3)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{section.icon} {section.title}</h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            color: 'white',
            fontSize: '1.2rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {section.items.map((item, index) => (
          <div key={index} style={{
            marginBottom: '1rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px'
          }}>
            {item.name && <h3 style={{ margin: '0 0 0.5rem 0', color: '#64ffda' }}>{item.name}</h3>}
            {item.category && <h3 style={{ margin: '0 0 0.5rem 0', color: '#64ffda' }}>{item.category}</h3>}
            {item.method && <h3 style={{ margin: '0 0 0.5rem 0', color: '#64ffda' }}>{item.method}</h3>}
            {item.details && <p>{item.details}</p>}
            {item.duration && <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{item.duration}</p>}
            {item.year && <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{item.year}</p>}
            {item.tech && <p style={{ fontSize: '0.9rem', color: '#64ffda' }}>{item.tech}</p>}
            {item.description && <p style={{ marginTop: '0.5rem' }}>{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
