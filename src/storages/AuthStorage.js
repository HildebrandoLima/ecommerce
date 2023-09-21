function getAuthData() {
  try {
    const authStorage = localStorage.getItem('userAuh');
    return authStorage ? JSON.parse(authStorage) : {};
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

export function userAuh() {
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