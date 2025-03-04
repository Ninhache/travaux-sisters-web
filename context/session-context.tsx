"use client";

import { handleLogin } from "@/service/api/connection";
import { handleProfile } from "@/service/api/profile";
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
  mail: "string";
  username: "string";
  password: "string";
  token: "string";
  phone: "string";
  adresse: "string";
  zipCode: "string";
  city: "string";
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
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

const SessionContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [session, setSessionState] = useState<SessionState>({
    user: null,
    token: null,
  });
  const [isConnected, setIsConnected] = useState(false);

  const { user, token } = session;

  const setSession = useCallback((updates: Partial<SessionState>) => {
    setSessionState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    if (session.user !== null) {
      setIsConnected(true);
    }
  }, [session]);

  const login = useCallback(async (email: string, password: string) => {
    const { token } = await handleLogin({ email, password });

    setSession({ token });

    await fetchProfile(token);
  }, []);

  const logout = () => {
    setSession({ user: null, token: null });
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
