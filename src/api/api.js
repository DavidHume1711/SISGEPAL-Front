import endpoints from './endpoints.json';
import environment from './environment.json';

export default function getAPI() {
    let url;
    switch(process.env.NODE_ENV) {
        case 'development': 
            url = environment.develop;
            break;
        case 'test': 
            url = environment.test;
            break;
        case 'production': 
            url = environment.production;  
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