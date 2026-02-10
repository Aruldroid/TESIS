
import React, { useState } from 'react';
import { ViewType, SavingRecord, LoanRecord, Member, UserRole, InstallmentRecord } from './types';
import { MOCK_MEMBERS, MOCK_SAVINGS, MOCK_LOANS } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SavingsList from './components/SavingsList';
import LoanManager from './components/LoanManager';
import MemberList from './components/MemberList';
import AIChat from './components/AIChat';
import InstallmentList from './components/InstallmentList';
import ProfileView from './components/ProfileView';

// Internal mock for installments, now moved out to allow passing as props
const MOCK_INSTALLMENTS: InstallmentRecord[] = [
  { id: 'I1', loanId: 'L1', memberName: 'Rina Wijaya', amount: 491666, paymentDate: '2023-07-05', installmentNumber: 1, status: 'Paid' },
  { id: 'I2', loanId: 'L1', memberName: 'Rina Wijaya', amount: 491666, paymentDate: '2023-08-05', installmentNumber: 2, status: 'Paid' },
];

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [savings, setSavings] = useState<SavingRecord[]>(MOCK_SAVINGS);
  const [loans, setLoans] = useState<LoanRecord[]>(MOCK_LOANS);
  const [installments, setInstallments] = useState<InstallmentRecord[]>(MOCK_INSTALLMENTS);
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: '',
    avatar: 'https://picsum.photos/seed/default/200'
  });

  // Login State
  const [loginStep, setLoginStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddLoan = (newLoan: LoanRecord) => {
    setLoans(prev => [...prev, newLoan]);
  };

  const handleUpdateLoan = (id: string, updates: Partial<LoanRecord>) => {
    setLoans(prev => prev.map(loan => loan.id === id ? { ...loan, ...updates } : loan));
  };

  const handleLogout = () => {
    setCurrentUserRole(null);
    setLoginStep('role');
    setSelectedRole(null);
    setUsername('');
    setPassword('');
    setActiveView('dashboard');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && selectedRole) {
      setCurrentUserRole(selectedRole);
      // Fixed user mapping for demonstration
      const name = selectedRole === 'Pengurus' ? 'Budi Santoso' : 'Rina Wijaya';
      setUserProfile({
        name: name,
        avatar: `https://picsum.photos/seed/${selectedRole === 'Pengurus' ? 'budi' : 'rina'}/200`
      });
    } else {
      alert('Silakan masukkan Nama Pengguna dan Password.');
    }
  };

  const handleUpdateProfile = (newName: string, newAvatar: string) => {
    setUserProfile({ name: newName, avatar: newAvatar });
  };

  if (!currentUserRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Koperasi_Indonesia_%282012%29.svg/1024px-Logo_Koperasi_Indonesia_%282012%29.svg.png" className="w-full h-full object-contain p-40" alt="" />
        </div>

        <div className="bg-white p-12 lg:p-16 rounded-[3.5rem] shadow-2xl w-full max-w-xl text-center border-4 border-white relative z-10 ios-card">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Koperasi_Indonesia_%282012%29.svg/1024px-Logo_Koperasi_Indonesia_%282012%29.svg.png" 
            className="w-24 h-24 object-contain mx-auto mb-8 drop-shadow-xl"
            alt="Logo Koperasi"
          />
          
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter leading-[0.9]">
            KOPERASI<br/><span className="text-[#00884b]">RAUDHATUL AMANAH</span>
          </h1>
          <p className="text-[10px] text-gray-400 mb-10 font-black uppercase tracking-[0.4em] border-y border-gray-50 py-3">Digitalisasi Koperasi</p>
          
          {loginStep === 'role' ? (
            <div className="space-y-6">
              <p className="text-lg font-bold text-gray-600 mb-4">Pilih Gerbang Masuk:</p>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => { setSelectedRole('Pengurus'); setLoginStep('credentials'); }}
                  className="w-full bg-[#00884b] text-white py-8 rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-[#006837] transition-all shadow-xl shadow-green-100 flex flex-col items-center group active:scale-[0.97]"
                >
                  <span className="text-xs opacity-70 mb-1">Masuk Sebagai</span>
                  <span className="text-2xl">👤 PENGURUS</span>
                </button>
                <button 
                  onClick={() => { setSelectedRole('Anggota'); setLoginStep('credentials'); }}
                  className="w-full bg-[#00884b] text-white py-8 rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-[#006837] transition-all shadow-xl shadow-green-100 flex flex-col items-center group active:scale-[0.97]"
                >
                  <span className="text-xs opacity-70 mb-1">Masuk Sebagai</span>
                  <span className="text-2xl">👥 ANGGOTA</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-6 text-left animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center space-x-4 mb-8 bg-green-50 p-4 rounded-3xl border border-green-100">
                <div className="w-12 h-12 bg-[#00884b] text-white rounded-2xl flex items-center justify-center text-xl font-bold">
                  {selectedRole === 'Pengurus' ? 'P' : 'A'}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Akses Portal</p>
                  <p className="text-lg font-black text-[#00884b] uppercase">{selectedRole}</p>
                </div>
                <button type="button" onClick={() => setLoginStep('role')} className="ml-auto text-[10px] font-black text-gray-400 uppercase hover:text-red-500 underline">Ganti</button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nama Pengguna (Username)</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#00884b] outline-none font-bold text-lg transition-all"
                  placeholder="Masukkan nama pengguna"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Kata Sandi (Password)</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#00884b] outline-none font-bold text-lg transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between px-2 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 accent-[#00884b] rounded" />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700">Ingat Saya</span>
                </label>
                <button type="button" className="text-sm font-black text-[#00884b] hover:text-[#006837] tracking-tight underline">Lupa Kata Sandi?</button>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#00884b] text-white py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-[#006837] transition-all shadow-2xl shadow-green-100 mt-4 active:scale-[0.98]"
              >
                Masuk Sekarang
              </button>
            </form>
          )}
          
          <p className="mt-12 text-[10px] text-gray-300 font-black uppercase tracking-widest">Kesejahteraan Bersama - Bunobogu 2024</p>
        </div>
      </div>
    );
  }

  // GLOBAL FILTER: Ensure Anggota only sees their data
  const filteredSavings = currentUserRole === 'Anggota' ? savings.filter(s => s.memberName === userProfile.name) : savings;
  const filteredLoans = currentUserRole === 'Anggota' ? loans.filter(l => l.memberName === userProfile.name) : loans;
  const filteredInstallments = currentUserRole === 'Anggota' ? installments.filter(i => i.memberName === userProfile.name) : installments;

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard savings={savings} loans={loans} members={members} userRole={currentUserRole} currentUserName={userProfile.name} />;
      case 'simpanan': return <SavingsList savings={filteredSavings} userRole={currentUserRole} />;
      case 'pinjaman': return <LoanManager loans={filteredLoans} members={members} onAddLoan={handleAddLoan} onUpdateLoan={handleUpdateLoan} userRole={currentUserRole} />;
      case 'angsuran': return <InstallmentList userRole={currentUserRole} installments={filteredInstallments} />;
      case 'anggota': return <MemberList members={members} roleFilter="Anggota" />;
      case 'pengurus': return <MemberList members={members} roleFilter="Pengurus" title="Data Pengurus" />;
      case 'ai-assistant': return <AIChat />;
      case 'profil': return <ProfileView initialName={userProfile.name} initialAvatar={userProfile.avatar} onUpdate={handleUpdateProfile} />;
      default: return <Dashboard savings={savings} loans={loans} members={members} userRole={currentUserRole} currentUserName={userProfile.name} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView} 
      userRole={currentUserRole} 
      onLogout={handleLogout}
      userProfile={userProfile}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
