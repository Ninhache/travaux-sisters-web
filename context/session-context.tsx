"use client";

import { mockLogin, mockRefreshToken } from "@/service/connection";
import { Maybe } from "@/types/util"; // Or wherever your 'Maybe' type is defined
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type User = {
  name: string;
  email: string;
  phone: string;
  adress: string;
};

interface SessionState {
  user: Maybe<User>;
  appToken: Maybe<string>;
  refreshToken: Maybe<string>;
}

interface SessionContextProps extends SessionState {
  setSession: (updates: Partial<SessionState>) => void;
  login: (email: string, password: string) => Promise<void>;
  refresh: () => Promise<void>;
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
    appToken: null,
    refreshToken: null,
  });

  const setSession = useCallback((updates: Partial<SessionState>) => {
    setSessionState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Mock login that fetches tokens and user data from a service
  const login = useCallback(async (email: string, password: string) => {
    const { appToken, refreshToken, user } = await mockLogin({
      email,
      password,
    });
    setSessionState({ user, appToken, refreshToken });
  }, []);

  // Example "refresh" flow: uses the refreshToken to get a new appToken
  const refresh = useCallback(async () => {
    if (!session.refreshToken) {
      throw new Error("No refresh token available");
    }
    const { appToken } = await mockRefreshToken(session.refreshToken);
    setSessionState((prev) => ({ ...prev, appToken }));
  }, [session.refreshToken]);

  return (
    <SessionContext.Provider
      value={{
        ...session,
        setSession,
        login,
        refresh,
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
