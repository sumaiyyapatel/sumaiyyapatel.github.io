export default function LoadingScreen({ isLoading, progress }) {
  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      color: 'white',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '3px solid rgba(100, 220, 255, 0.2)',
        borderTopColor: '#64ffda',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 20px rgba(100, 220, 255, 0.2)'
      }}></div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px 0', fontWeight: '500', color: '#64ffda' }}>
          Loading Portfolio
        </h2>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem' }}>
          Preparing 3D environment... {Math.round(progress)}%
        </p>
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(100, 220, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '12px'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #64ffda, #00bcd4)',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>
    </div>
  );
}
