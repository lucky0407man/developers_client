import { useTheme } from '../../hooks';

export default function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Page</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
        Welcome to the about page. Here you can customize your theme preferences.
      </p>
      <ThemeComponent />
    </div>
  );
}

function ThemeComponent() {
  const { theme, setTheme } = useTheme();

  const buttonStyle = (isActive: boolean) => ({
    padding: '12px 24px',
    backgroundColor: isActive ? 'var(--button-bg)' : 'var(--bg-secondary)',
    color: isActive ? 'var(--button-text)' : 'var(--text-primary)',
    border: `2px solid ${isActive ? 'var(--button-bg)' : 'var(--border-color)'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? `0 2px 8px var(--shadow)` : 'none',
  });

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ marginBottom: '10px' }}>Theme Settings</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Current theme: <strong style={{ color: 'var(--text-primary)' }}>{theme}</strong>
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setTheme('light')}
          style={buttonStyle(theme === 'light')}
          onMouseOver={(e) => {
            if (theme !== 'light') {
              e.currentTarget.style.borderColor = 'var(--button-bg)';
            }
          }}
          onMouseOut={(e) => {
            if (theme !== 'light') {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }
          }}
        >
          ☀️ Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          style={buttonStyle(theme === 'dark')}
          onMouseOver={(e) => {
            if (theme !== 'dark') {
              e.currentTarget.style.borderColor = 'var(--button-bg)';
            }
          }}
          onMouseOut={(e) => {
            if (theme !== 'dark') {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }
          }}
        >
          🌙 Dark
        </button>
      </div>
    </div>
  );
}
