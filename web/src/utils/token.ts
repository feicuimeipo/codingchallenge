

const TokenKey = '__auth_provider_token__'
export function setToken(token:string) {
    return localStorage.setItem(TokenKey,token)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}

export function getToken():string|null {
    return localStorage.getItem(TokenKey)
}

