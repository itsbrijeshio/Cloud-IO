// ================= USER =================
export interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  storageUsed: number;
  storageQuota: number;
  createdAt: Date;
  updatedAt: Date;
}

// ================= AUTH CONTEXT =================
export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
}
