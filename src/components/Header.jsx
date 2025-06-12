import { Github, Linkedin, Mail } from 'lucide-react';

export default function Header({ onReset }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: 'none',
      background: 'linear-gradient(to bottom, rgba(10, 10, 20, 0.8), rgba(10, 10, 20, 0))',
      backdropFilter: 'blur(5px)'
    }}>
      <h1
        onClick={onReset}
        style={{
          margin: 0,
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '600',
          pointerEvents: 'auto',
          cursor: 'pointer',
          textShadow: '0 0 10px rgba(100, 220, 255, 0.5)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#64ffda'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
      >
        Sumaiyya Patel
      </h1>

      <div style={{
        display: 'flex',
        gap: '12px',
        pointerEvents: 'auto'
      }}>
        <a
          href="https://github.com/sumaiyyapatel"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(100, 220, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/sumaiyya-patel"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(100, 220, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:smahinn1@gmail.com"
          style={{
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(100, 220, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Mail size={20} />
        </a>
      </div>
    </header>
  );
}
