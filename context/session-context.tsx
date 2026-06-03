"use client";
import { handleLogin, handleRegister } from "@/lib/api/connection";
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
  imageId: number;
};

interface SessionState {
  user: Maybe<User>;
  token: Maybe<string>;
}

interface SessionContextProps extends SessionState {
  setSession: (updates: Partial<SessionState>) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isConnected: boolean;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

export const LOCAL_STORAGE_KEY = "session";

const SessionContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [session, setSessionState] = useState<SessionState>({
    user: null,
    token: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  // test
  const { user, token } = session;

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      try {
        const storedSession = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedSession) {
          const parsedSession: SessionState = JSON.parse(storedSession);
          setSessionState(parsedSession);
          setIsConnected(!!parsedSession.user);
          if (parsedSession.token) {
            await fetchProfile(parsedSession.token);
          }
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // Update localStorage whenever session changes
  useEffect(() => {
    if (session.user) {
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

  const login = useCallback(async (mail: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await handleLogin({ mail, password });
      localStorage.setItem("accessToken", token);
      setSession({ token });

      await fetchProfile(token);
    } catch (error) {
      logout();
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (mail: string, password: string) => {
    setLoading(true);
    try {
      // Crée le compte puis ouvre la session avec le token renvoyé.
      const { token } = await handleRegister({ mail, password });
      localStorage.setItem("accessToken", token);
      setSession({ token });

      await fetchProfile(token);
    } catch (error) {
      logout();
      // On relance pour que le formulaire puisse afficher le message d'erreur.
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    setSession({ user: null, token: null });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem("accessToken");
    setIsConnected(false);
    setLoading(false);
  };

  const fetchProfile = useCallback(
    async (passedToken?: string) => {
      const authToken = passedToken ?? token;
      if (!authToken) {
        return;
      }

      setLoading(true);
      try {
        const user = await handleProfile({ token: authToken });
        setSession({ user });
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return (
    <SessionContext.Provider
      value={{
        ...session,
        setSession,
        login,
        register,
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
