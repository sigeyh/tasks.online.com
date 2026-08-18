import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Phone, ArrowRight } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch {
      setError('Cannot connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="glass-panel p-10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-primary/5 rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-secondary/5 rounded-full" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-primary-dark to-primary rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-primary/30 rotate-3 hover:rotate-6 transition-transform duration-300">
              <span className="text-3xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>T</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1.5">Sign in to your TaskCenter account</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. 0712345678"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white/60 focus:bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-dark to-primary-light shadow-md shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? 'Signing In...' : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
