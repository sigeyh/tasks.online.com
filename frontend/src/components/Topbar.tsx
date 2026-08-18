import { useAuthStore } from '../store/authStore';
import { Bell, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const isLimitReached = user.completedToday >= user.dailyLimit;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
        <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
          Welcome back, {user.phone}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-slate-700">
            {user.tier} Tier
          </span>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs text-slate-500 mb-1">Daily Tasks: {user.completedToday}/{user.dailyLimit}</div>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-primary'}`} 
              style={{ width: `${Math.min((user.completedToday / user.dailyLimit) * 100, 100)}%` }}
            />
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
