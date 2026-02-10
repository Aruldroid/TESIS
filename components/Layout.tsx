
import React from 'react';
import { ViewType, UserRole } from '../types';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  userRole: UserRole;
  onLogout: () => void;
  userProfile: { name: string; avatar: string };
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, userRole, onLogout, userProfile }) => {
  const allItems: { id: ViewType; label: string; icon: React.ReactNode; roles: UserRole[] }[] = [
    { id: 'dashboard', label: 'Halaman Utama', icon: <ICONS.Dashboard />, roles: ['Pengurus', 'Anggota'] },
    { id: 'simpanan', label: 'Data Simpanan', icon: <ICONS.Savings />, roles: ['Pengurus', 'Anggota'] },
    { id: 'pinjaman', label: 'Ajukan Pinjaman', icon: <ICONS.Loans />, roles: ['Pengurus', 'Anggota'] },
    { id: 'angsuran', label: 'Catatan Angsuran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, roles: ['Pengurus', 'Anggota'] },
    { id: 'anggota', label: 'Data Anggota', icon: <ICONS.Members />, roles: ['Pengurus'] },
    { id: 'pengurus', label: 'Data Pengurus', icon: <ICONS.Board />, roles: ['Pengurus'] },
    { id: 'ai-assistant', label: 'Bantuan AI', icon: <ICONS.AI />, roles: ['Pengurus', 'Anggota'] },
    { id: 'profil', label: 'Profil Saya', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, roles: ['Pengurus', 'Anggota'] },
  ];

  const menuItems = allItems.filter(item => item.roles.includes(userRole));
  const activeBg = 'bg-[#00884b] text-white';
  const sidebarTitle = userRole === 'Pengurus' ? 'Portal Pengurus' : 'Portal Anggota';

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f7]">
      <aside className="w-80 glass border-r border-gray-200 flex flex-col hidden lg:flex shadow-2xl z-30">
        <div className="p-10 border-b border-gray-100">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Koperasi_Indonesia_%282012%29.svg/1024px-Logo_Koperasi_Indonesia_%282012%29.svg.png" 
              className="w-14 h-14 object-contain"
              alt="Logo"
            />
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">RAUDHATUL<br/>AMANAH</h1>
              <p className="text-[10px] font-black text-[#ffcc00] uppercase tracking-[0.2em] mt-2">Digitalisasi Koperasi</p>
            </div>
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest bg-[#00884b]`}>
            {sidebarTitle}
          </div>
        </div>

        <nav className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-5 rounded-[1.75rem] transition-all duration-300 font-bold text-lg ${
                activeView === item.id 
                  ? `${activeBg} shadow-xl scale-[1.03]` 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className={`p-2 rounded-xl ${activeView === item.id ? 'bg-white/20' : 'bg-gray-50'}`}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-3 px-6 py-5 rounded-[2rem] bg-gray-900 text-white hover:bg-black transition-all font-black text-sm uppercase tracking-widest shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#f5f5f7]">
        <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100 px-12 py-8 flex justify-between items-center sticky top-0 z-20">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter capitalize">
              {activeView.replace('-', ' ')}
            </h2>
            <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Digital Koperasi Amanah</p>
          </div>
          <button 
            onClick={() => onViewChange('profil')}
            className="flex items-center space-x-6 hover:bg-gray-50 p-2 rounded-3xl transition-all cursor-pointer text-left"
          >
            <div className="text-right">
              <p className="text-lg font-black text-gray-900 leading-none">{userProfile.name}</p>
              <p className="text-xs font-bold text-[#00884b] uppercase mt-1 tracking-widest font-black">{userRole === 'Pengurus' ? 'Ketua Pengurus' : 'Anggota Aktif'}</p>
            </div>
            <div className="w-16 h-16 rounded-[1.5rem] bg-white ios-card p-1 shadow-md border-2 border-[#00884b]/20 overflow-hidden">
               <img src={userProfile.avatar} className="w-full h-full rounded-[1.25rem] object-cover" alt="Profile" />
            </div>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 max-w-7xl mx-auto w-full scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
