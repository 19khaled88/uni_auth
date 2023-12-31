export type ILogin = {
  id: string
  password: string
}

export type ITokenData ={
    id:string,
    role:string
}

export type IAccessTokenResponse ={
   accessToken:string 
}
export type IRefreshTokenResponse ={
   refreshToken:string 
}

export type ILoginRespone = {
  accessToken: string
  refreshToken: string
}
