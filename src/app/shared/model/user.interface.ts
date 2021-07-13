export type Roles = 'BUSINESS';

export interface userI {
    uid?: string;
    displayName?: string;
    email: string;
    role?: Roles;
    photoURL?: string;
    emailVerified?: boolean;
  }