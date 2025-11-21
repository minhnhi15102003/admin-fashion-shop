import type { ProfileUser } from "../types/Authen";

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
};

export const setAccessToken = (token:string) => {
    localStorage.setItem('accessToken',token)
};

export const setUser = (user:ProfileUser) => {
    localStorage.setItem('user',JSON.stringify(user))
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
};