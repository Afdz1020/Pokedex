import React, {useState, createContext, ReactNode} from 'react';

// type UserData = {
//   username: string;
//   password: string;
// };

export type userDetails = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};
export type UserContextType = {
  login: (userData: userDetails) => void;
  logout: () => void;
  auth: userDetails;
};

export const AuthContext = createContext<UserContextType>({
  auth: {} as userDetails,
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = 'AuthContext';

type Props = {
  children: ReactNode;
};

export default function AuthProvider({children}: Props) {
  const [auth, setAuth] = useState<userDetails>({} as userDetails);

  const login = (userData: userDetails) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth({} as userDetails);
  };

  const valueContext = {
    auth,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
