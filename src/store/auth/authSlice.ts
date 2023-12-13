import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginPayload {
    email: string;
    password: string;
}
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            console.log('login action', action.payload);
            state.isAuthenticated = true;
            //state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);


export const { login, logout } = authSlice.actions;

export default persistedAuthReducer;
