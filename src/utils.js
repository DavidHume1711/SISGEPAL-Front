import jwtDecode from "jwt-decode";

export const getToken = () => {
    return window.localStorage.getItem("sisgepal-token");
}

export const saveToken = (token) => {
    window.localStorage.setItem("sisgepal-token", token);
}

export const decodeToken = () => {
    if(typeof getToken() != "object"){
        return jwtDecode(getToken());
    }

    return null;
}

export const removeToken = (removeSession) => {
    window.localStorage.removeItem("sisgepal-token");
    alert("Su sesión ha terminado. Inicie sesión de nuevo.");
    removeSession();
}