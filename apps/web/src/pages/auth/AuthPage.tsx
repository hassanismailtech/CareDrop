import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens, cardStyle } from '../../shared/styles';

export const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 480, margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 8, fontSize: 30 }}>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
        <p style={{ color: tokens.colors.textMuted, margin: 0 }}>Secure access to your medicines and orders.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, background: '#eef2ff', borderRadius: 999, padding: 6 }}>
        <button onClick={() => setMode('signin')} style={{ flex: 1, border: 0, borderRadius: 999, padding: '10px 14px', background: mode === 'signin' ? tokens.colors.primary : 'transparent', color: mode === 'signin' ? '#fff' : '#334155', fontWeight: 700 }}>
          Sign in
        </button>
        <button onClick={() => setMode('signup')} style={{ flex: 1, border: 0, borderRadius: 999, padding: '10px 14px', background: mode === 'signup' ? tokens.colors.primary : 'transparent', color: mode === 'signup' ? '#fff' : '#334155', fontWeight: 700 }}>
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ ...cardStyle, display: 'grid', gap: 12 }}>
        {mode === 'signup' && (
          <input placeholder="Full name" style={inputStyle} />
        )}
        <input placeholder="Email or phone" style={inputStyle} />
        <input placeholder="Password" type="password" style={inputStyle} />
        <button type="submit" style={{ border: 0, borderRadius: 12, padding: '12px 14px', background: tokens.colors.primary, color: '#fff', fontWeight: 700 }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 10,
  border: `1px solid ${tokens.colors.border}`,
  fontSize: 15,
};
