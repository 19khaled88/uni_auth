import { z } from 'zod'

const userLoginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'user id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
})

const passwordChangeZodSchema = z.object({
  body: z.object({
    id:z.string({required_error:'user id is required'}),
    old_password: z.string({ required_error: 'old password is required' }),
    new_password: z.string({ required_error: 'new password is required' }),
    confirm_password: z.string({
      required_error: 'confirm password is required',
    }),
  }),
})

export const UserZodValidation = {
  userLoginZodSchema,
  refreshTokenZodSchema,
  passwordChangeZodSchema,
}
