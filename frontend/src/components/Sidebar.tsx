import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Crown, Command, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Upgrade Plan', href: '/upgrade', icon: Crown },
    { name: 'Admin Panel', href: '/admin', icon: Command },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 shadow-premium">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-gradient-to-tr from-primary-dark to-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary/30">
            T
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight font-['Outfit']">
            Task<span className="text-primary">Center</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white font-semibold shadow-md shadow-primary/25'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 text-slate-400 hover:text-slate-700 px-4 py-2 w-full rounded-xl hover:bg-slate-50 transition-all duration-200">
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
