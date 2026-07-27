export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  fullName: string;
  role: UserRole;
}
