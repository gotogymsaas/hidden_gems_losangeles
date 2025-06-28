import { createContext, useState } from 'react';

export const InstagramAuthContext = createContext({
  token: null,
  setToken: () => {}
});

export function InstagramAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <InstagramAuthContext.Provider value={{ token, setToken }}>
      {children}
    </InstagramAuthContext.Provider>
  );
}
