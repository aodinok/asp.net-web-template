const AUTH_DATA_KEY = 'authData'

export function getAuthToken() {
  try {
    const tokenData = JSON.parse(localStorage.getItem(AUTH_DATA_KEY))
    if (tokenData && Date.parse(tokenData.expiresAt) > new Date()) {
      return tokenData
    }
  } catch(e) {
    console.warn(e)
  }
  return null
}

export function setAuthToken(tokenData) {
  if (!tokenData) {
    throw new Error('ArgumentException: tokenData is required for setAuthToken!')
  }

  const {access_token: token, username, expires_in} = tokenData
  const expiresAt = new Date()
  expiresAt.setSeconds(expiresAt.getSeconds() + expires_in)
  tokenData = {
    token,
    username,
    expiresAt
  }
  if (token) {
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(tokenData))
  }
  return tokenData
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_DATA_KEY)
}
