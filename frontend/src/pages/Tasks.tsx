import { CheckCircle } from 'lucide-react';

const Tasks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Tasks</h2>
        <p className="text-slate-500 mt-1">History of tasks you have completed or are working on.</p>
      </div>
      
      <div className="glass-panel p-12 text-center h-[50vh] flex flex-col items-center justify-center">
         <div className="flex justify-center mb-6">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle className="w-8 h-8 text-slate-300" />
           </div>
         </div>
         <h3 className="text-2xl font-bold text-slate-700">No tasks history yet</h3>
         <p className="text-slate-500 mt-3 max-w-xs mx-auto">Claim tasks from the dashboard to see them appear here and track your earnings.</p>
      </div>
    </div>
  );
};

export default Tasks;
