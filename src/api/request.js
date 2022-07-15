import { getAPI } from "./api";
import endpoints from './endpoints.json'


export const doLoginRequest = async (loginDTO) => {
    const api = getAPI();
    console.log(api);
    const url = api.url+api.endpoints.session;
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDTO)
    }
    return fetch(url, config)
        .then(response => response.json())
        .then(json => json)
}