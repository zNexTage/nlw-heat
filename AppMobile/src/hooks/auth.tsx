import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = "4053a50fc77a1a98bd73";
const SCOPE = "read:user";

const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSigning: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthResponse = {
    token: string;
    user: User;
}

type AuthorizationResponse = {
    params: {
        code?: string,
        error?: string
    },
    type?: string;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isSigning, setIsSigning] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

    const signIn = async (): Promise<void> => {
        setIsSigning(true);

        try {
            const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

            if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {

                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });

                const { user, token } = authResponse.data as AuthResponse;

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, token);

                setUser(user);
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsSigning(false);
        }
    }

    const signOut = async (): Promise<void> => {
        setUser(null);
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
    }

    useEffect(() => {
        const loadUserStorageData = async () => {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if (userStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;

                setUser(JSON.parse(userStorage));
            }

            setIsSigning(false);
        }

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isSigning,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}


export { AuthProvider, useAuth };