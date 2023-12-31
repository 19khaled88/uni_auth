export type ILogin = {
  id: string
  password: string
}

export type ITokenData = {
  id: string
  role: string
}

export type IAccessTokenResponse = {
  accessToken: string
}
export type IRefreshTokenResponse = {
  refreshToken: string
}

export type ILoginRespone = {
  accessToken: string
  refreshToken: string
}
export type IChangePassword = {
  id:string,
  old_password: string
  new_password: string
  confirm_password: string
}
