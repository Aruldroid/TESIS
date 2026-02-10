
import React from 'react';
import { Member, SavingRecord, LoanRecord } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Budi Santoso', role: 'Pengurus', position: 'Ketua', joinDate: '2020-01-15', email: 'budi@koperasi.com', phone: '08123456789', avatar: 'https://picsum.photos/seed/budi/100' },
  { id: '2', name: 'Siti Aminah', role: 'Pengurus', position: 'Sekretaris', joinDate: '2020-02-10', email: 'siti@koperasi.com', phone: '08123456788', avatar: 'https://picsum.photos/seed/siti/100' },
  { id: '3', name: 'Ahmad Hidayat', role: 'Pengurus', position: 'Bendahara', joinDate: '2020-03-05', email: 'ahmad@koperasi.com', phone: '08123456787', avatar: 'https://picsum.photos/seed/ahmad/100' },
  { id: '4', name: 'Rina Wijaya', role: 'Anggota', joinDate: '2021-05-20', email: 'rina@mail.com', phone: '08123456786', avatar: 'https://picsum.photos/seed/rina/100', creditStatus: 'Lancar' },
  { id: '5', name: 'Dedi Kurniawan', role: 'Anggota', joinDate: '2021-08-12', email: 'dedi@mail.com', phone: '08123456785', avatar: 'https://picsum.photos/seed/dedi/100', creditStatus: 'Kurang Lancar' },
  { id: '6', name: 'Andi Pratama', role: 'Anggota', joinDate: '2022-01-10', email: 'andi@mail.com', phone: '08123456784', avatar: 'https://picsum.photos/seed/andi/100', creditStatus: 'Macet' },
];

export const MOCK_SAVINGS: SavingRecord[] = [
  { id: 'S1', memberId: '4', memberName: 'Rina Wijaya', type: 'Pokok', amount: 100000, date: '2021-05-20' },
  { id: 'S2', memberId: '4', memberName: 'Rina Wijaya', type: 'Wajib', amount: 50000, date: '2023-10-01' },
  { id: 'S3', memberId: '5', memberName: 'Dedi Kurniawan', type: 'Sukarela', amount: 2000000, date: '2023-11-15' },
  { id: 'S4', memberId: '5', memberName: 'Dedi Kurniawan', type: 'Pokok', amount: 100000, date: '2021-08-12' },
  { id: 'S5', memberId: '6', memberName: 'Andi Pratama', type: 'Pokok', amount: 100000, date: '2022-01-10' },
  { id: 'S6', memberId: '4', memberName: 'Rina Wijaya', type: 'Sukarela', amount: 250000, date: '2023-12-20' },
];

export const MOCK_LOANS: LoanRecord[] = [
  { id: 'L1', memberId: '4', memberName: 'Rina Wijaya', memberPhone: '08123456786', ktpNumber: '3271012345678904', amount: 5000000, interestRate: 1.5, tenureMonths: 12, monthlyInstallment: 491666, status: 'Aktif', startDate: '2023-06-01' },
  { id: 'L2', memberId: '5', memberName: 'Dedi Kurniawan', memberPhone: '08123456785', ktpNumber: '3271012345678905', amount: 10000000, interestRate: 1.5, tenureMonths: 24, monthlyInstallment: 566667, status: 'Menunggu', startDate: '2024-02-15' },
  { id: 'L3', memberId: '6', memberName: 'Andi Pratama', memberPhone: '08123456784', ktpNumber: '3271012345678906', amount: 15000000, interestRate: 1.5, tenureMonths: 12, monthlyInstallment: 1475000, status: 'Menunggu', startDate: '2024-03-01' },
];

export const ICONS = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Savings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Loans: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Members: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Board: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  AI: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
};
