import CONFIG from 'config';

const BAD_REQUEST = 400;
const NO_CONTENT = 204;

function buildQueryParams(params = {}) {
    const pairs = Object.keys(params)
        .reduce((result, name) => result.concat(`${name}=${params[name]}`), []);

    return pairs.length ? `?${pairs.join('&')}` : '';
}

function handleJSONError(error) {
    console.log(`API JSON Error: ${ error }`);
    throw error;
}

function performRequest({ url, method, parameters, authToken }) {
    const headers = authToken
        ? new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` })
        : new Headers({ 'Content-Type': 'application/json' });

    let requestUrl = `${CONFIG.API_ENDPOINT}${url}`;
    let requestBody = null;

    // console.log(parameters)

    if (method === 'get') {
        requestUrl += buildQueryParams(parameters || {});
    } else {
        requestBody = JSON.stringify(parameters);
    }

    const request = new Request(requestUrl, {
        method,
        mode: 'cors',
        redirect: 'follow',
        headers,
        body: requestBody
    });

    return new Promise((resolve, reject) => {
        fetch(request)
            .then((response) => {
                if (response.status >= BAD_REQUEST) {
                    return response.json().then((body) => {
                        reject(Object.assign({}, body, { status: response.status }));
                    }).catch(handleJSONError);
                }

                return (response.status === NO_CONTENT ? Promise.resolve({}) : response.json())
                    .then((body) => resolve(body))
                    .catch(handleJSONError);
            });
    });
}


class API {

}

export default API;
