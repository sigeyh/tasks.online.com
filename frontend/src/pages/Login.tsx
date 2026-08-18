import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend. Make sure it is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel p-8 sm:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-tr-full -z-10 group-hover:bg-secondary/10 transition-colors duration-500" />
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 hover:rotate-6 transition-all duration-300">
            <span className="text-2xl font-bold text-white font-['Outfit']">Ai</span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-800 font-['Outfit'] tracking-tight">Welcome back</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium">Enter your M-Pesa phone number to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. 0712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none block w-full px-4 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-light hover:from-primary shadow-primary/25 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? 'Authenticating...' : 'Sign In / Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
