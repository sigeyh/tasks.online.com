import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, Phone, CreditCard, MapPin, Globe, ChevronDown } from 'lucide-react';

const KENYAN_COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa','Homa Bay',
  'Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga','Kisii',
  'Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos','Makueni','Mandera',
  'Marsabit','Meru','Migori','Mombasa','Murang\'a','Nairobi','Nakuru','Nandi',
  'Narok','Nyamira','Nyandarua','Nyeri','Samburu','Siaya','Taita-Taveta','Tana River',
  'Tharaka-Nithi','Trans Nzoia','Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot'
];

const COUNTRIES = [
  'Kenya','Uganda','Tanzania','Rwanda','Ethiopia','South Africa','Nigeria','Ghana',
  'United States','United Kingdom','Canada','Australia','India','Other'
];

const InputField = ({ label, icon: Icon, error, ...props }: {
  label: string;
  icon: React.ElementType;
  error?: string;
  [key: string]: unknown;
}) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      <input
        {...props}
        className={`block w-full pl-10 pr-4 py-3 border rounded-xl bg-white/60 focus:bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-slate-400 ${
          error ? 'border-red-300' : 'border-slate-200'
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const SelectField = ({ label, icon: Icon, children, ...props }: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      <select
        {...props}
        className="block w-full pl-10 pr-9 py-3 border border-slate-200 rounded-xl bg-white/60 focus:bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none text-slate-700"
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    county: '',
    country: 'Kenya',
    gender: '',
  });

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        setServerError(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setServerError('Cannot connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full" />

        <div className="relative z-10">
          <div className="text-center mb-7">
            <div className="w-14 h-14 bg-gradient-to-tr from-primary-dark to-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/30 rotate-3">
              <span className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>T</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Create Account</h2>
            <p className="text-slate-500 text-sm mt-1">Join thousands of earners on TaskCenter</p>
          </div>

          {serverError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <InputField
                  label="Full Name"
                  icon={User}
                  type="text"
                  required
                  placeholder="e.g. John Kamau"
                  value={form.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('fullName', e.target.value)}
                />
              </div>

              <InputField
                label="Phone Number"
                icon={Phone}
                type="tel"
                required
                placeholder="e.g. 0712345678"
                value={form.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('phone', e.target.value)}
              />

              <InputField
                label="National ID / Passport"
                icon={CreditCard}
                type="text"
                required
                placeholder="ID or Passport No."
                value={form.idNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('idNumber', e.target.value)}
              />

              <SelectField
                label="Gender"
                icon={User}
                required
                value={form.gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set('gender', e.target.value)}
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </SelectField>

              <SelectField
                label="County"
                icon={MapPin}
                required
                value={form.county}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set('county', e.target.value)}
              >
                <option value="" disabled>Select county</option>
                {KENYAN_COUNTIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </SelectField>

              <div className="sm:col-span-2">
                <SelectField
                  label="Country"
                  icon={Globe}
                  required
                  value={form.country}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set('country', e.target.value)}
                >
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </SelectField>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-dark to-primary-light shadow-md shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? 'Creating Account...' : 'Create My Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
