import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange } from '../services/auth.js';
import { getUserProfile } from '../services/users.js';

const AuthContext = createContext({
  user: null,
  profile: null,
  role: null,
  ready: false
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        try {
          setProfile(await getUserProfile(nextUser.uid));
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setReady(true);
    });
    return unsubscribe;
  }, []);

  const isAdmin = profile?.role === 'admin';
  const value = {
    user,
    profile,
    role: profile?.role ?? null,
    isAdmin,
    // Admins are always approved; others need an admin to approve them.
    approved: isAdmin || profile?.approved === true,
    ready
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
