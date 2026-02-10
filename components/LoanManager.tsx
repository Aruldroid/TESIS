
import React, { useState, useEffect } from 'react';
import { LoanRecord, Member, UserRole, CreditStatus } from '../types';

// Helper for Indonesian Currency Formatting
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

interface LoanManagerProps {
  loans: LoanRecord[];
  members: Member[];
  onAddLoan: (newLoan: LoanRecord) => void;
  onUpdateLoan: (id: string, updates: Partial<LoanRecord>) => void;
  userRole: UserRole;
}

const LoanManager: React.FC<LoanManagerProps> = ({ loans, members, onAddLoan, onUpdateLoan, userRole }) => {
  const [displayAmount, setDisplayAmount] = useState('');
  const [formData, setFormData] = useState({
    memberName: userRole === 'Anggota' ? 'Rina Wijaya' : '',
    memberEmail: userRole === 'Anggota' ? 'rina@mail.com' : '',
    memberPhone: userRole === 'Anggota' ? '08123456786' : '',
    ktpNumber: userRole === 'Anggota' ? '3271012345678901' : '',
    amount: 0,
    tenure: 12,
    interest: 1.5
  });

  const [negotiatingId, setNegotiatingId] = useState<string | null>(null);
  const [negoAmountDisplay, setNegoAmountDisplay] = useState('');
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  useEffect(() => {
    if (formData.amount > 0) {
      const principalPart = formData.amount / formData.tenure;
      const interestPart = formData.amount * (formData.interest / 100);
      setMonthlyInstallment(Math.ceil(principalPart + interestPart));
    } else {
      setMonthlyInstallment(0);
    }
  }, [formData]);

  const handleAmountChange = (val: string) => {
    const numericValue = val.replace(/\./g, '').replace(/[^0-9]/g, '');
    const num = Number(numericValue);
    setFormData({ ...formData, amount: num });
    setDisplayAmount(num > 0 ? formatCurrency(num) : '');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0 || !formData.ktpNumber || !formData.memberPhone || !formData.memberName) {
      alert('Mohon lengkapi data wajib: Nama, No. KTP, dan No. WA/Telepon');
      return;
    }
    if (formData.ktpNumber.length !== 16) {
      alert('Nomor KTP harus berjumlah 16 digit');
      return;
    }
    const newLoan: LoanRecord = {
      id: `L${Date.now()}`,
      memberId: userRole === 'Anggota' ? '4' : 'NEW_APP',
      memberName: formData.memberName,
      memberEmail: formData.memberEmail,
      memberPhone: formData.memberPhone,
      ktpNumber: formData.ktpNumber,
      amount: formData.amount,
      interestRate: formData.interest,
      tenureMonths: formData.tenure,
      monthlyInstallment,
      status: 'Menunggu',
      startDate: new Date().toISOString().split('T')[0]
    };
    onAddLoan(newLoan);
    setDisplayAmount('');
    if (userRole === 'Pengurus') {
      setFormData({ 
        memberName: '', memberEmail: '', memberPhone: '', ktpNumber: '', 
        amount: 0, tenure: 12, interest: 1.5 
      });
    } else {
      setFormData({ ...formData, amount: 0 });
    }
    alert('Pengajuan Anda telah berhasil dikirim!');
  };

  const handleNegotiate = (loan: LoanRecord) => {
    setNegotiatingId(loan.id);
    setNegoAmountDisplay(formatCurrency(loan.amount));
  };

  const saveNegotiation = (id: string) => {
    const loan = loans.find(l => l.id === id);
    if (!loan) return;
    const numericNego = Number(negoAmountDisplay.replace(/\./g, ''));
    const principalPart = numericNego / loan.tenureMonths;
    const interestPart = numericNego * (loan.interestRate / 100);
    const newInstallment = Math.ceil(principalPart + interestPart);
    onUpdateLoan(id, { amount: numericNego, proposedAmount: loan.amount, status: 'Nego', monthlyInstallment: newInstallment });
    setNegotiatingId(null);
  };

  const getCreditBadge = (status?: CreditStatus) => {
    switch (status) {
      case 'Lancar': return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black border border-emerald-200">🟢 LANCAR</span>;
      case 'Kurang Lancar': return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black border border-amber-200">🟡 KURANG LANCAR</span>;
      case 'Macet': return <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[9px] font-black border border-rose-200">🔴 MACET</span>;
      default: return <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black border border-slate-200">BARU</span>;
    }
  };

  const activeLoans = loans.filter(l => l.status === 'Aktif');
  const visibleLoans = userRole === 'Anggota' ? loans.filter(l => l.memberName === 'Rina Wijaya') : loans;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 1. Formulir Pengajuan (Hanya Anggota atau Pengurus yg Input Manual) */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="flex items-center space-x-5 mb-10">
          <div className="p-4 rounded-[1.5rem] bg-[#00884b] text-white shadow-lg shadow-green-100">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Formulir Pengajuan Pinjaman</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Lengkapi data untuk evaluasi plafon</p>
          </div>
        </div>

        <form onSubmit={handleSubmitApplication} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 pb-2 border-b border-gray-100 mb-2">
            <h4 className="text-[10px] font-black text-[#00884b] uppercase tracking-widest">Langkah 1: Identitas Pemohon</h4>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap *</label>
            <input type="text" value={formData.memberName} readOnly={userRole === 'Anggota'} onChange={(e) => setFormData({...formData, memberName: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-[#00884b] outline-none text-lg font-bold" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">NIK KTP *</label>
            <input type="text" maxLength={16} value={formData.ktpNumber} onChange={(e) => setFormData({...formData, ktpNumber: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-[#00884b] outline-none text-lg font-bold" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">No. WA/Telepon *</label>
            <input type="text" value={formData.memberPhone} onChange={(e) => setFormData({...formData, memberPhone: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-[#00884b] outline-none text-lg font-bold" required />
          </div>

          <div className="lg:col-span-3 pb-2 border-b border-gray-100 mt-6 mb-2">
            <h4 className="text-[10px] font-black text-[#00884b] uppercase tracking-widest">Langkah 2: Rincian Pinjaman</h4>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jumlah Pinjaman (Rp) *</label>
            <input type="text" value={displayAmount} onChange={(e) => handleAmountChange(e.target.value)} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-[#00884b] outline-none font-black text-[#00884b] text-xl" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lama Tenor (Bulan)</label>
            <select value={formData.tenure} onChange={(e) => setFormData({...formData, tenure: Number(e.target.value)})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] font-black">
              {[6, 12, 18, 24, 36].map(m => <option key={m} value={m}>{m} Bulan</option>)}
            </select>
          </div>
          <div className="bg-[#00884b]/5 p-6 rounded-[1.5rem] border border-[#00884b]/10 flex flex-col justify-center">
            <p className="text-[9px] font-black text-[#00884b] uppercase tracking-widest mb-1">Cicilan Bulanan</p>
            <p className="text-2xl font-black text-[#00884b]">Rp {monthlyInstallment.toLocaleString('id-ID')}</p>
          </div>
          <div className="lg:col-span-3 flex justify-end">
             <button type="submit" className="px-12 py-5 rounded-full bg-[#00884b] text-white font-black uppercase tracking-widest shadow-xl hover:bg-[#006837] transition-all">Kirim Pengajuan</button>
          </div>
        </form>
      </div>

      {/* 2. Daftar Piutang (Hanya untuk Pengurus) */}
      {userRole === 'Pengurus' && (
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-rose-100 overflow-hidden">
          <div className="px-10 py-8 border-b bg-rose-50/30 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Daftar Piutang Berjalan</h3>
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-1">Aset Pinjaman Aktif di Anggota</p>
            </div>
            <div className="bg-rose-100 text-rose-700 px-6 py-3 rounded-2xl">
              <p className="text-[9px] font-black uppercase tracking-widest">Total Piutang</p>
              <p className="text-xl font-black">Rp {activeLoans.reduce((a, b) => a + b.amount, 0).toLocaleString('id-ID')}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-6">Debitur (Anggota)</th>
                  <th className="px-10 py-6 text-right">Plafon Pinjaman</th>
                  <th className="px-10 py-6 text-center">Tenor</th>
                  <th className="px-10 py-6 text-right">Cicilan/Bulan</th>
                  <th className="px-10 py-6">Tanggal Akad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-rose-50/20 transition-all">
                    <td className="px-10 py-6">
                      <p className="font-black text-gray-900">{loan.memberName}</p>
                      <p className="text-[10px] text-gray-400 font-bold">WA: {loan.memberPhone}</p>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <p className="font-black text-rose-600 text-lg">Rp {loan.amount.toLocaleString('id-ID')}</p>
                    </td>
                    <td className="px-10 py-6 text-center text-sm font-bold text-gray-600">{loan.tenureMonths} Bulan</td>
                    <td className="px-10 py-6 text-right font-bold text-gray-900">Rp {loan.monthlyInstallment.toLocaleString('id-ID')}</td>
                    <td className="px-10 py-6 text-[11px] font-bold text-gray-400 uppercase">{loan.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Status Pengajuan / Monitoring Umum */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-10 py-8 border-b bg-gray-50/50">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Status Pengajuan & Verifikasi</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Data pengajuan terbaru masuk</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-10 py-6">Nama Anggota</th>
                <th className="px-10 py-6 text-right">Nominal</th>
                <th className="px-10 py-6 text-center">Skor Kredit</th>
                <th className="px-10 py-6">Status</th>
                {userRole === 'Pengurus' && <th className="px-10 py-6 text-right">Aksi Verifikasi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <p className="font-black text-gray-900">{loan.memberName}</p>
                    <p className="text-[10px] text-gray-400 font-bold">KTP: {loan.ktpNumber}</p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    {negotiatingId === loan.id ? (
                      <input type="text" className="w-32 p-2 border-2 border-[#00884b] rounded-lg text-right font-black" value={negoAmountDisplay} onChange={(e) => setNegoAmountDisplay(e.target.value)} />
                    ) : (
                      <p className="font-black text-gray-900">Rp {loan.amount.toLocaleString('id-ID')}</p>
                    )}
                  </td>
                  <td className="px-10 py-6 text-center">
                    {getCreditBadge(members.find(m => m.name === loan.memberName)?.creditStatus)}
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                      loan.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-100' : 
                      loan.status === 'Ditolak' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  {userRole === 'Pengurus' && (
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => onUpdateLoan(loan.id, { status: 'Aktif' })} className="bg-[#00884b] text-white p-2 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></button>
                        <button onClick={() => onUpdateLoan(loan.id, { status: 'Ditolak' })} className="bg-rose-600 text-white p-2 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanManager;
