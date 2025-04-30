import { useStorageState } from '@/store/useStorageState';
import { useContext, createContext, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
    signIn: (value: { accessToken: string; refreshToken: string }) => void;
    signOut: () => void;
    session?: { accessToken: string; refreshToken: string } | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    return useContext(AuthContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (value) => {
                    setSession(value);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
