import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Check, Shield, Smartphone } from 'lucide-react';

const plans = [
  { name: 'Basic', priceUSD: 3, priceKES: 390, limit: 15, features: ['15 tasks per day', 'Standard payout speed', 'Email support'] },
  { name: 'Pro', priceUSD: 6, priceKES: 780, limit: 30, features: ['30 tasks per day', 'Priority payouts', 'Premium support', 'Access to Elite tasks'] },
  { name: 'Elite', priceUSD: 12, priceKES: 1560, limit: 9999, features: ['Unlimited tasks', 'Instant M-Pesa payouts', '24/7 dedicated support', 'Beta feature access'] }
];

const Upgrade = () => {
  const { user, upgradeTier } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSTKPush = async () => {
    if (!selectedPlan || !user) return;
    setIsProcessing(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/payments/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: user.phone, amount: selectedPlan.priceKES, plan: selectedPlan.name })
      });
      
      const data = await res.json();
      if (data.success) {
        // Simulate a delay for M-Pesa prompt and callback
        setTimeout(() => {
          alert('Payment Successful via M-Pesa! Upgraded to ' + selectedPlan.name);
          upgradeTier(selectedPlan.name, selectedPlan.limit);
          setIsProcessing(false);
          setSelectedPlan(null);
        }, 3000);
      }
    } catch (e) {
      console.error(e);
      alert('Payment failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
       <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl mb-6 shadow-inner">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
          Upgrade your daily limits
        </h2>
        <p className="mt-4 text-lg text-slate-500 font-medium">
          Current Tier: <span className="font-bold text-primary">{user?.tier}</span> ({user?.dailyLimit} tasks/day)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 px-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative bg-white rounded-[2rem] p-8 flex flex-col border-2 ${selectedPlan?.name === plan.name ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-slate-100 shadow-xl hover:border-slate-300'} transition-all duration-300 cursor-pointer overflow-hidden`} onClick={() => setSelectedPlan(plan)}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10" />
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-6 flex items-baseline text-6xl font-extrabold text-slate-900 tracking-tighter">
                <span className="text-3xl font-semibold text-slate-400 mr-2">KES</span>
                {plan.priceKES}
                <span className="ml-2 text-xl font-medium text-slate-500">/mo</span>
              </div>
              <p className="mt-2 flex items-center text-sm font-medium text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100 w-fit">
                ~ ${plan.priceUSD} USD
              </p>
            </div>
            <ul className="flex-1 space-y-5 mb-10">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              className={`w-full py-4 px-4 rounded-2xl font-bold text-lg transition-all duration-300 ${selectedPlan?.name === plan.name ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark translate-y-0' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              {selectedPlan?.name === plan.name ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setSelectedPlan(null)}>
              <span className="sr-only">Close</span>
              ✕
            </button>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Smartphone className="w-10 h-10 text-[#52B44B]" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-2">M-Pesa Pay</h3>
              <p className="text-slate-500 text-lg">Upgrading to {selectedPlan.name} Plan for <strong className="text-slate-900">KES {selectedPlan.priceKES}</strong></p>
            </div>

            <button 
              onClick={handleSTKPush} 
              disabled={isProcessing}
              className="w-full bg-[#52B44B] hover:bg-[#439c3d] text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Waiting for Pin...
                </>
              ) : 'Confirm Payment'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upgrade;
