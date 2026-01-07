import { useTheme } from '../../hooks';

export default function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Page</h1>
      <ThemeComponent />
    </div>
  );
}

function ThemeComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ marginTop: '20px' }}>
      <p>Current theme: <strong>{theme}</strong></p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('system')}>System</button>
      </div>
    </div>
  );
}
