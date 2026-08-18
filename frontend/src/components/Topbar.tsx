import { useAuthStore } from '../store/authStore';
import { Bell, LogOut, Shield, Zap } from 'lucide-react';
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
  const progressPct = Math.min((user.completedToday / user.dailyLimit) * 100, 100);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 z-10 sticky top-0 shadow-soft">
      <div className="flex items-center">
        <h1 className="text-base font-semibold text-slate-700 hidden sm:block">
          Hey, <span className="text-primary font-bold">{user.phone}</span> 👋
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Tier badge */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
          user.tier === 'Premium'
            ? 'bg-amber-50 border-amber-200 text-amber-700'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          {user.tier === 'Premium' ? <Zap className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
          {user.tier} Tier
        </div>

        {/* Progress */}
        <div className="hidden sm:flex flex-col items-end gap-1">
          <span className="text-xs text-slate-400 font-medium">
            Tasks: <span className={`font-bold ${isLimitReached ? 'text-red-500' : 'text-slate-700'}`}>{user.completedToday}/{user.dailyLimit}</span>
          </span>
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isLimitReached ? 'bg-red-400' : 'bg-gradient-to-r from-primary to-secondary'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
