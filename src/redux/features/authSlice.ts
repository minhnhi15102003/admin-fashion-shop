import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProfileUser } from '../../types/Authen';

const accessToken = localStorage.getItem("accessToken");
const user = localStorage.getItem("user");

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: ProfileUser | null;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("accessToken") !== null,
    accessToken,
    user: user ? JSON.parse(user) : null,
};
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ accessToken: string; user: ProfileUser }>) {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.user = null;
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;