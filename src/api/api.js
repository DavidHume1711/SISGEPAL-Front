import endpoints from './endpoints.json';
import environment from './environment.json';

export function getAPI() {
    let url;
    switch(process.env.NODE_ENV) {
        case 'development': 
            url = environment.develop.url;
            break;
        case 'test': 
            url = environment.test.url;
            break;
        case 'production': 
            url = environment.production.url;  
            break;
        default:
            url = null;  
    }
    const apiData = {
        url,
        endpoints
    }

    return apiData;
}