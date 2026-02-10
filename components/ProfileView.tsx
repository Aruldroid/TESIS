
import React, { useState } from 'react';

interface ProfileViewProps {
  initialName: string;
  initialAvatar: string;
  onUpdate: (name: string, avatar: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ initialName, initialAvatar, onUpdate }) => {
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdate(name, avatar);
      setIsSaving(false);
      alert('Profil berhasil diperbarui!');
    }, 600);
  };

  const changeAvatar = () => {
    const newSeed = Math.floor(Math.random() * 1000);
    setAvatar(`https://picsum.photos/seed/${newSeed}/200`);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#00884b]"></div>
        
        <div className="relative inline-block mb-10 group">
          <div className="w-40 h-40 rounded-[2.5rem] bg-gray-50 p-1 shadow-xl border-4 border-white overflow-hidden transition-transform group-hover:scale-105">
            <img src={avatar} className="w-full h-full object-cover rounded-[2rem]" alt="Profile Avatar" />
          </div>
          <button 
            onClick={changeAvatar}
            className="absolute -bottom-4 -right-4 bg-[#00884b] text-white p-4 rounded-full shadow-lg hover:bg-[#006837] transition-all group-active:scale-90"
            title="Ganti Foto Secara Acak"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-2">Pengaturan Akun</h3>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Koperasi Raudhatul Amanah</p>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nama Tampilan</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[1.75rem] focus:border-[#00884b] outline-none font-bold text-xl text-gray-800 transition-all"
              placeholder="Masukkan nama baru"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Alamat Link Foto Profil</label>
            <input 
              type="text" 
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[1.75rem] focus:border-[#00884b] outline-none font-medium text-sm text-gray-500 transition-all"
              placeholder="https://tautan-foto-anda.jpg"
              required
            />
            <p className="text-[10px] text-gray-300 italic px-2">* Anda bisa menempelkan link foto apa saja dari internet atau klik tombol putar di atas foto.</p>
          </div>

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#00884b] text-white py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-[#006837] shadow-2xl shadow-green-100 transition-all active:scale-[0.97] flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menyimpan...</span>
              </span>
            ) : (
              <span>Simpan Perubahan</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
