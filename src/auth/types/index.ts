export interface AuthUser {
  id: string
  username: string
  email: string
  accessToken: string
}

export interface JwtPayload {
  id: string
  username: string
  email: string
  iat?: number
  exp?: number
}

export interface JwtUser {
  id: string
  email: string
  username: string
}
