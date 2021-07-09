export type Roles = 'BUSINES';

export interface userI {
    uid?: string;
    displayName?: string;
    email: string;
    role?: Roles;
    photoURL?: string;
    emailVerified?: boolean;
  }