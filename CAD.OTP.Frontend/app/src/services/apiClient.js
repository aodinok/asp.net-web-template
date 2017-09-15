import toUrlEncoded from './utils'

// TODO extract api
export async function fetchToken ({username, password}) {
  const body =  toUrlEncoded({
    'grant_type': 'password',
    username,
    password
  })

  const request =  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  }

  const response = await fetch(`${__API_SERVER__}/token`, request)
  return await response.json()
}

export function killToken () {
  // TODO call server
}
