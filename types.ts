
export type UserRole = 'Pengurus' | 'Anggota';
export type CreditStatus = 'Lancar' | 'Kurang Lancar' | 'Macet';

export interface Member {
  id: string;
  name: string;
  role: UserRole;
  position?: string;
  joinDate: string;
  email: string;
  phone: string;
  avatar: string;
  creditStatus?: CreditStatus;
}

export interface SavingRecord {
  id: string;
  memberId: string;
  memberName: string;
  type: 'Pokok' | 'Wajib' | 'Sukarela';
  amount: number;
  date: string;
}

export interface LoanRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail?: string;
  memberPhone: string;
  ktpNumber: string;
  amount: number;
  proposedAmount?: number;
  interestRate: number;
  tenureMonths: number;
  monthlyInstallment: number;
  status: 'Aktif' | 'Lunas' | 'Menunggu' | 'Ditolak' | 'Nego';
  startDate: string;
  notes?: string;
}

export interface InstallmentRecord {
  id: string;
  loanId: string;
  memberName: string;
  amount: number;
  paymentDate: string;
  installmentNumber: number;
  status: 'Paid' | 'Pending';
}

export type ViewType = 'dashboard' | 'simpanan' | 'pinjaman' | 'angsuran' | 'anggota' | 'pengurus' | 'ai-assistant' | 'profil';
