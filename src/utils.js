import jwtDecode from "jwt-decode";

export const getToken = () => {
    return window.localStorage.getItem('sisgepal-token');
}

export const saveToken = (token) => {
    window.localStorage.setItem('sisgepal-token', token);
}

export const decodeToken = () => {
    return jwtDecode(getToken());
}