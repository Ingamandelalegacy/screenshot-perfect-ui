import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'partner' | 'client';

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
  isClient: boolean;
}

const adminUser: User = {
  name: 'Admin UAT User 3',
  role: 'admin',
};

const partnerUser: User = {
  name: 'Partner UAT Merchant User 1',
  role: 'partner',
};

const clientUser: User = {
  name: 'Client User 1',
  role: 'client',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>('admin');

  const getUserByRole = (role: UserRole): User => {
    switch (role) {
      case 'admin':
        return adminUser;
      case 'partner':
        return partnerUser;
      case 'client':
        return clientUser;
      default:
        return adminUser;
    }
  };

  const user = getUserByRole(userRole);

  const value: UserContextType = {
    user,
    setUserRole,
    isAdmin: userRole === 'admin',
    isPartner: userRole === 'partner',
    isClient: userRole === 'client',
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
