"use client";
import { handleLogin } from "@/lib/api/connection";
import { handleProfile } from "@/lib/api/profile";
import { Maybe } from "@/types/util";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  mail: string;
  username: string;
  password: string;
  token: string;
  phone: string;
  adresse: string;
  zipCode: string;
  city: string;
};

interface SessionState {
  user: Maybe<User>;
  token: Maybe<string>;
}

interface SessionContextProps extends SessionState {
  setSession: (updates: Partial<SessionState>) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isConnected: boolean;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "session";

const SessionContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [session, setSessionState] = useState<SessionState>({
    user: null,
    token: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true); // <-- New loading state

  const { user, token } = session;

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      const storedSession = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSession) {
        const parsedSession: SessionState = JSON.parse(storedSession);
        setSessionState(parsedSession);
        setIsConnected(parsedSession.user !== null);
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  // Update localStorage whenever session changes
  useEffect(() => {
    if (session.user !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
      setIsConnected(true);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setIsConnected(false);
    }
  }, [session]);

  const setSession = useCallback((updates: Partial<SessionState>) => {
    setSessionState((prev) => {
      const newSession = { ...prev, ...updates };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSession));
      return newSession;
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { token } = await handleLogin({ email, password });
    setSession({ token });

    await fetchProfile(token);
    setLoading(false);
  }, []);

  const logout = () => {
    setSession({ user: null, token: null });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const fetchProfile = useCallback(
    async (passedToken?: string) => {
      const authToken = passedToken ?? token;
      if (!authToken)
        throw Error("Token is not defined, ensure you're logged in");

      const user = await handleProfile({ token: authToken });
      setSession({ user });
    },
    [token, user]
  );

  return (
    <SessionContext.Provider
      value={{
        ...session,
        setSession,
        login,
        logout,
        isConnected,
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionContextProvider");
  }
  return context;
};

export { SessionContextProvider, useSession };
