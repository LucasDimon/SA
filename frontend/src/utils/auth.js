export function setToken(token) { localStorage.setItem('petadote_token', token); }
export function getToken() { return localStorage.getItem('petadote_token'); }
export function removeToken() { localStorage.removeItem('petadote_token'); }
export function logout() { removeToken(); window.location.href = '/login'; }
