import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'partner';

interface User {
  name: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
  isAdmin: boolean;
  isPartner: boolean;
}

const adminUser: User = {
  name: 'Admin UAT User 3',
  role: 'admin',
};

const partnerUser: User = {
  name: 'Partner UAT Merchant User 1',
  role: 'partner',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>('admin');

  const user = userRole === 'admin' ? adminUser : partnerUser;

  const value: UserContextType = {
    user,
    setUserRole,
    isAdmin: userRole === 'admin',
    isPartner: userRole === 'partner',
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
