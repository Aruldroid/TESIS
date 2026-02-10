
import React, { useState } from 'react';
import { SavingRecord, UserRole, Member } from '../types';
import { MOCK_MEMBERS } from '../constants'; // Import for aggregation

interface SavingsListProps {
  savings: SavingRecord[];
  userRole: UserRole;
}

const SavingsList: React.FC<SavingsListProps> = ({ savings, userRole }) => {
  const [filter, setFilter] = useState<'All' | 'Pokok' | 'Wajib' | 'Sukarela'>('All');
  
  const filtered = filter === 'All' ? savings : savings.filter(s => s.type === filter);

  const exportReport = () => {
    // Agregasi data per anggota
    const reportData = MOCK_MEMBERS.filter(m => m.role === 'Anggota').map((member, index) => {
      const memberSavings = savings.filter(s => s.memberName === member.name);
      const pokok = memberSavings.filter(s => s.type === 'Pokok').reduce((acc, curr) => acc + curr.amount, 0);
      const wajib = memberSavings.filter(s => s.type === 'Wajib').reduce((acc, curr) => acc + curr.amount, 0);
      const sukarela = memberSavings.filter(s => s.type === 'Sukarela').reduce((acc, curr) => acc + curr.amount, 0);
      
      return {
        no: index + 1,
        nama: member.name,
        pokok: pokok,
        wajib: wajib,
        sukarela: sukarela,
        total: pokok + wajib + sukarela
      };
    });

    // Buat header CSV mengikuti format gambar (No, Nama Anggota, Simpanan Pokok, Wajib, Sukarela, Total)
    // Baris 1: Header Utama
    let csvContent = "No,Nama Anggota,Simpanan Pokok,Simpanan, ,Total\n";
    // Baris 2: Sub-Header untuk Wajib/Sukarela
    csvContent += " , , ,Wajib,Sukarela, \n";
    
    // Tambahkan baris data
    reportData.forEach(row => {
      csvContent += `${row.no},${row.nama},${row.pokok},${row.wajib},${row.sukarela},${row.total}\n`;
    });

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Simpanan_Anggota_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Simpanan Pokok</p>
          <p className="text-2xl font-black text-[#00884b] mt-1">Rp 100.000 <span className="text-xs font-bold text-gray-400 uppercase">/ Sekali</span></p>
        </div>
        <div className="bg-[#00884b] p-6 rounded-3xl shadow-lg shadow-green-100 text-white">
          <p className="text-[10px] font-black text-green-100 uppercase tracking-widest">Total Simpanan Pokok</p>
          <p className="text-2xl font-black mt-1">Rp {savings.filter(s => s.type === 'Pokok').reduce((a,b) => a+b.amount, 0).toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-100 text-white">
          <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Total Simpanan Wajib</p>
          <p className="text-2xl font-black mt-1">Rp {savings.filter(s => s.type === 'Wajib').reduce((a,b) => a+b.amount, 0).toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-amber-500 p-6 rounded-3xl shadow-lg shadow-amber-100 text-white">
          <p className="text-[10px] font-black text-amber-100 uppercase tracking-widest">Total Sukarela</p>
          <p className="text-2xl font-black mt-1">Rp {savings.filter(s => s.type === 'Sukarela').reduce((a,b) => a+b.amount, 0).toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
          {['All', 'Pokok', 'Wajib', 'Sukarela'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                filter === f ? 'bg-white text-[#00884b] shadow-md' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {f === 'All' ? 'Semua' : f}
            </button>
          ))}
        </div>

        {userRole === 'Pengurus' && (
          <div className="flex items-center space-x-3">
            <button 
              onClick={exportReport}
              className="bg-white border-2 border-green-100 text-[#00884b] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-all shadow-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span>Ekspor Excel Sesuai Format</span>
            </button>
            <button className="bg-[#00884b] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#006837] transition-all shadow-xl shadow-green-100 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <span>Input Setoran</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-10 py-6 border-b bg-gray-50/30">
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Jurnal Transaksi Simpanan</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Anggota</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Nominal</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-5 text-xs font-mono text-gray-400 tracking-tighter">#{s.id}</td>
                  <td className="px-10 py-5">
                    <p className="font-black text-gray-800 text-sm group-hover:text-[#00884b] transition-all">{s.memberName}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Anggota Koperasi</p>
                  </td>
                  <td className="px-10 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      s.type === 'Pokok' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      s.type === 'Wajib' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {s.type}
                    </span>
                  </td>
                  <td className="px-10 py-5 text-right font-black text-gray-900 text-sm tracking-tight">
                    Rp {s.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-10 py-5 text-gray-500 text-xs font-bold uppercase tracking-tighter">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavingsList;
