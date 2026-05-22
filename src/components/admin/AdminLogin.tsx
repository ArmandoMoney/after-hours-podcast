import { useState, FormEvent } from 'react';

interface AdminLoginProps {
  onAuth: () => void;
}

export default function AdminLogin({ onAuth }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        'https://g5r62apb6syarmksjcnzsktiuq0vnfvi.lambda-url.us-east-1.on.aws/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('ceo_admin_auth', 'true');
        onAuth();
      } else {
        setError('Invalid password.');
        setLoading(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
        <img
          src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg"
          alt="CEO Media"
          className="h-20 rounded-xl mb-10 object-contain opacity-0 anim-logo-fast"
        />
        <h1
          className="text-2xl font-semibold text-white tracking-wide mb-8 opacity-0 anim-heading-fast"
        >
          Admin Access
        </h1>
        <div
          className="w-full opacity-0 anim-subtext-fast"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3.5 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white
                       placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
        <div
          className="w-full mt-6 opacity-0 anim-button-fast"
        >
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 bg-white text-[#0A0A0A] font-semibold rounded-xl
                       transition-all duration-200 hover:bg-white/90 disabled:opacity-50
                       disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
