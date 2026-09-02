import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRoleState] = useState(null); // null = not logged in
  const [name, setName] = useState('');

  const setRole = (newRole, userName) => {
    setRoleState(newRole);
    if (userName) setName(userName);
  };

  return (
    <UserContext.Provider value={{ role, name, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
