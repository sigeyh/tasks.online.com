import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen mesh-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-14 w-14 bg-gradient-to-tr from-primary-dark to-primary rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-premium rotate-3 mb-2">
            T
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-black text-slate-900 tracking-tight font-['Outfit']">
          Task <span className="gradient-text">Center</span>
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Professional micro-tasks platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
