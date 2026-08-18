import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Crown, Settings, Command } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Upgrade Plan', href: '/upgrade', icon: Crown },
    { name: 'Admin Panel', href: '/admin', icon: Command },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            T
          </div>
          <span className="text-xl font-bold text-slate-800">TaskCenter</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center gap-3 text-slate-500 hover:text-slate-900 px-3 py-2 w-full transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
