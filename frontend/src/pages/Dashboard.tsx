import { useEffect, useState } from 'react';
import { PlayCircle, Clock, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface Task {
  id: number;
  type: string;
  title: string;
  earnings: number;
  estimatedTime: string;
  status: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, incrementCompleted } = useAuthStore();

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const handleClaim = (taskId: number) => {
    if (!user) return;
    if (user.completedToday >= user.dailyLimit) {
      alert('Daily limit reached! Please upgrade your plan.');
      return;
    }

    fetch(`http://localhost:5000/api/tasks/${taskId}/claim`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Task claimed & completed successfully! (Mock)');
          incrementCompleted();
        }
      });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Available Tasks</h2>
        <p className="text-slate-500 mt-2 font-medium">Select a task to start earning immediately. M-Pesa payouts are processed fast.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="glass-panel p-6 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col h-full bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
            
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200 mb-3">
                {task.type}
              </span>
              <h3 className="text-xl font-bold text-slate-800 line-clamp-2 leading-snug">{task.title}</h3>
            </div>
            
            <div className="mt-auto space-y-5">
              <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{task.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{task.earnings} KES</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleClaim(task.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 hover:shadow-lg text-white rounded-xl font-semibold transition-all ease-out"
              >
                <PlayCircle className="w-5 h-5 text-secondary-light" />
                Start Earning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
