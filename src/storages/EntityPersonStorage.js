export function setUser(data) {
    return localStorage.setItem('userId', data);
}

export function getUser() {
    return localStorage.getItem('userId');
}

export function removeUser() {
    return localStorage.removeItem('userId');
}

export function setProvider(data) {
    return localStorage.setItem('providerId', data);
}

export function getProvider() {
    return localStorage.getItem('providerId');
}

export function removeProvider() {
    return localStorage.removeItem('providerId');
}