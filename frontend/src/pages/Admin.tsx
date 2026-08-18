import { Users, DollarSign, Activity, FileText } from 'lucide-react';

const Admin = () => {
  const stats = [
    { name: 'Total Users', value: '1,429', icon: Users, change: '+12%' },
    { name: 'Active Tasks', value: '3,842', icon: Activity, change: '+24%' },
    { name: 'Daily Revenue', value: 'KES 45,900', icon: DollarSign, change: '+8%' },
    { name: 'Pending Approvals', value: '156', icon: FileText, change: '-4%' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Admin Overview</h2>
        <p className="text-slate-500 mt-2 font-medium">Platform performance and user management dashboard.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-panel p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 overflow-hidden">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Users</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">071234567{i}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${i === 1 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                      {i === 1 ? 'Elite' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">Aug 18, 2026</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-emerald-100 text-emerald-700">Active</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                    <button className="text-primary hover:text-primary-dark mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
