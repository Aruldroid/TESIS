
import React from 'react';
import { Member } from '../types';

interface MemberListProps {
  members: Member[];
  title?: string;
  roleFilter?: 'Anggota' | 'Pengurus';
}

const MemberList: React.FC<MemberListProps> = ({ members, title = "Data Anggota", roleFilter }) => {
  const filteredMembers = roleFilter ? members.filter(m => m.role === roleFilter) : members;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {filteredMembers.map((m) => (
        <div key={m.id} className="glass p-10 squircle ios-shadow border border-white flex flex-col items-center text-center group hover:scale-[1.05] transition-all duration-500 relative overflow-hidden">
          {/* Accent decoration */}
          <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 -mr-12 -mt-12 ${m.role === 'Pengurus' ? 'bg-indigo-600' : 'bg-emerald-600'}`}></div>
          
          <div className="relative mb-6">
            <img 
              src={m.avatar} 
              alt={m.name} 
              className={`w-28 h-28 squircle border-4 transition-all duration-500 group-hover:rotate-6 ${m.role === 'Pengurus' ? 'border-indigo-100' : 'border-emerald-100'}`} 
            />
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg ${m.role === 'Pengurus' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
              {m.role}
            </div>
          </div>

          <h4 className="text-xl font-[900] text-slate-800 tracking-tighter mb-1">{m.name}</h4>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-8 ${m.role === 'Pengurus' ? 'text-indigo-600' : 'text-emerald-600'}`}>
            {m.position || 'Registered Member'}
          </p>
          
          <div className="w-full space-y-4 pt-6 border-t border-slate-100/50">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Contact Info</span>
              <span className="text-sm font-bold text-slate-700">{m.phone}</span>
              <span className="text-xs font-medium text-slate-400">{m.email}</span>
            </div>
            
            <div className="bg-slate-50/50 p-4 rounded-3xl">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Member Since</p>
              <p className="text-sm font-black text-slate-800">{m.joinDate}</p>
            </div>
          </div>

          {m.creditStatus && (
            <div className={`mt-6 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              m.creditStatus === 'Lancar' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
              m.creditStatus === 'Macet' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              Score: {m.creditStatus}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberList;
