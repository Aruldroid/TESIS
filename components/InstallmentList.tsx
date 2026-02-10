
import React from 'react';
import { InstallmentRecord, UserRole } from '../types';

interface InstallmentListProps {
  userRole: UserRole;
  installments: InstallmentRecord[];
}

const InstallmentList: React.FC<InstallmentListProps> = ({ userRole, installments }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Catatan Angsuran</h3>
        {userRole === 'Pengurus' && (
           <button className="bg-[#00884b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#006837] shadow-lg shadow-green-100 flex items-center space-x-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
           <span>Catat Pembayaran</span>
         </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Anggota</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ke-</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Jumlah Bayar</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal Bayar</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {installments.length > 0 ? installments.map((i) => (
              <tr key={i.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-xs font-mono text-gray-400">{i.id}</td>
                <td className="px-6 py-4 font-bold text-gray-800 text-sm">{i.memberName}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{i.installmentNumber}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900 text-sm">Rp {i.amount.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">{i.paymentDate}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">LUNAS</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Tidak ada catatan angsuran</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstallmentList;
