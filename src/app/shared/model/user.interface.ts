export type Roles = 'BUSINESS';

export interface userI {
    uid?: string;
    displayName?: string;
    title?:string;
    email: string;
    role?: Roles;
    photoURL?: string;
    emailVerified?: boolean;
    logo?:string;
    fondo?:string;
  }