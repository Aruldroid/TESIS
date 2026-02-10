
import React from 'react';
import { SavingRecord, LoanRecord, Member, UserRole } from '../types';

interface DashboardProps {
  savings: SavingRecord[];
  loans: LoanRecord[];
  members: Member[];
  userRole: UserRole;
  currentUserName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ savings, loans, members, userRole, currentUserName }) => {
  // Filter data based on role for privacy
  const userSavings = userRole === 'Anggota' 
    ? savings.filter(s => s.memberName === currentUserName)
    : savings;
    
  const userLoans = userRole === 'Anggota' 
    ? loans.filter(l => l.memberName === currentUserName)
    : loans;

  const totalSavings = userSavings.reduce((acc, curr) => acc + curr.amount, 0);
  const totalLoans = userLoans.reduce((acc, curr) => acc + curr.amount, 0);
  const activeLoansCount = userLoans.filter(l => l.status === 'Aktif').length;

  const stats = userRole === 'Pengurus' ? [
    { label: 'Total Kas Koperasi', value: `Rp ${totalSavings.toLocaleString('id-ID')}`, color: 'text-[#00884b]', icon: '💰', desc: 'Dana terkumpul' },
    { label: 'Total Pinjaman Keluar', value: `Rp ${totalLoans.toLocaleString('id-ID')}`, color: 'text-[#e61d2b]', icon: '🏦', desc: 'Dana di anggota' },
    { label: 'Anggota Terdaftar', value: `${members.length} Orang`, color: 'text-indigo-600', icon: '👥', desc: 'Warga Bunobogu' },
    { label: 'Kontrak Pinjaman', value: `${activeLoansCount} Berkas`, color: 'text-amber-600', icon: '📜', desc: 'Unit aktif' },
  ] : [
    { label: 'Saldo Simpanan Saya', value: `Rp ${totalSavings.toLocaleString('id-ID')}`, color: 'text-[#00884b]', icon: '💰', desc: 'Total simpanan Anda' },
    { label: 'Sisa Pinjaman Saya', value: `Rp ${totalLoans.toLocaleString('id-ID')}`, color: 'text-[#e61d2b]', icon: '🏦', desc: 'Tagihan berjalan' },
    { label: 'Status Keanggotaan', value: 'Aktif', color: 'text-indigo-600', icon: '✅', desc: 'Anggota Tetap' },
    { label: 'Pinjaman Aktif', value: `${activeLoansCount} Kontrak`, color: 'text-amber-600', icon: '📜', desc: 'Berkas disetujui' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* High Contrast Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-10 ios-card border border-gray-100 flex flex-col items-center text-center shadow-lg">
            <div className="w-20 h-20 bg-gray-50 rounded-[1.75rem] flex items-center justify-center text-4xl mb-6 shadow-inner">
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color} tracking-tighter leading-none mb-2`}>{stat.value}</p>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-12 ios-card border border-gray-100 shadow-xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                {userRole === 'Pengurus' ? 'Aktivitas Seluruh Anggota' : 'Riwayat Aktivitas Saya'}
              </h3>
              <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">
                {userRole === 'Pengurus' ? 'Rekapitulasi Transaksi Global' : 'Catatan Transaksi Pribadi'}
              </p>
            </div>
            <button className="bg-[#00884b] text-white px-8 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-lg hover:bg-green-800 transition-all">Lihat Semua Laporan</button>
          </div>
          <div className="space-y-8">
            {userSavings.length > 0 ? (
              userSavings.slice(-4).reverse().map((s, idx) => (
                <div key={s.id} className="flex items-center p-6 rounded-[2rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:shadow-xl">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center mr-8 font-black text-gray-300 text-2xl group-hover:bg-[#00884b] group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-black text-gray-900 leading-none mb-2">
                      {userRole === 'Pengurus' ? s.memberName : 'Simpanan Masuk'}
                    </p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Penyetoran {s.type} • {s.date}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-[#00884b] tracking-tighter">+ Rp {s.amount.toLocaleString('id-ID')}</p>
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Berhasil diverifikasi</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Belum ada riwayat transaksi</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#00884b] p-12 ios-card shadow-2xl text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
              <span className="text-5xl">🏛️</span>
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 leading-none text-[#ffcc00]">Sistem Digital Amanah</h3>
            <p className="text-sm font-bold text-green-100/70 mb-10 leading-relaxed uppercase tracking-widest">Mewujudkan Kesejahteraan Bersama<br/>Melalui Gotong Royong Digital</p>
            
            <div className="space-y-4 text-left">
               <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 flex items-center space-x-4">
                 <div className="w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-gray-900 font-black">✓</div>
                 <div>
                   <p className="text-sm font-black uppercase tracking-widest">Privasi Terjaga</p>
                   <p className="text-[10px] text-green-100/50">Data Anda Adalah Rahasia</p>
                 </div>
               </div>
               <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 flex items-center space-x-4">
                 <div className="w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-gray-900 font-black">✓</div>
                 <div>
                   <p className="text-sm font-black uppercase tracking-widest">Transparan & Akuntabel</p>
                   <p className="text-[10px] text-green-100/50">Laporan Real-time</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
