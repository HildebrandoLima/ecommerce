function getAuthData() {
  try {
    const authStorage = localStorage.getItem('userAuth');
    return authStorage ? JSON.parse(authStorage) : {};
  } catch (error) {
    throw error;
  }
}

export function removeAuth() {
  try {
    localStorage.removeItem('userAuth');
  } catch (error) {
    throw error;
  }
}

export function setAuth(data) {
  try {
    localStorage.setItem('userAuth', JSON.stringify(data));
  } catch (error) {
    throw error;
  }
}

export function token() {
  try {
    const authData = getAuthData();
    return authData.accessToken;
  } catch (error) {
    throw error;
  }
}

export function userAuth() {
  try {
    const authData = getAuthData();
    return [authData.userId, authData.userName, authData.userEmail, authData.isAdmin];
  } catch (error) {
    throw error;
  }
}

export function permissions() {
  try {
    const authData = getAuthData();
    return authData.permissions;
  } catch (error) {
    throw error;
  }
}