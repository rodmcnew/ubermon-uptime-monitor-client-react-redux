import fetch from 'isomorphic-fetch'
import config from '../config'

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';

export function login(credentials) {
    return dispatch => {
        return fetch(config.apiBase + '/Users/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        })
            .then(parseResponse)
            .then(json => dispatch(loginFulfilled(json)))
    }
}

function loginFulfilled(json) {
    return {
        type: LOGIN_FULFILLED,
        accessToken: json.id,
        userId: json.userId
    }
}

//@TODO do not alert from the actions file. Maybe use axios instead of fetch?
function parseResponse(response) {
    switch (response.status) {
        case 401:
            alert('Unauthorized. Please ensure you are logged in.');
            break;
        case 200:
            return response.json();
        default:
            alert('Could not communicate with the server. Check your internet connection');
    }
}
