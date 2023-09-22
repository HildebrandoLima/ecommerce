export function setUser(data) {
    return localStorage.setItem('userId', data);
}

export function getUser() {
    return localStorage.getItem('userId');
}

export function removeUser() {
    return localStorage.removeItem('userId');
}