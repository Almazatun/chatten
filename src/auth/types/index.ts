interface AuthUser {
  id: string
  username: string
  email: string
  accessToken: string
}

interface JwtPayload {
  id: string
  username: string
  email: string
  iat?: number
  exp?: number
}

interface JwtUser {
  id: string
  email: string
  username: string
}

interface VerificationPayload {
  email: string
  password: string
  username: string
}

export { AuthUser,
  JwtUser,
  JwtPayload,
  VerificationPayload };
