import jwtDecode from "jwt-decode";

export const saveToken = (token) => {
    window.localStorage.setItem('sisgepal-token', token);
}

export const decodeToken = () => {
    return jwtDecode(window.localStorage.getItem('sisgepal-token'));
}