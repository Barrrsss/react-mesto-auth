export const BASE_URL = 'https://api.nomoreparties.co';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (email, password) => {
    return fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(responseCheck)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(responseCheck)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(responseCheck)
}