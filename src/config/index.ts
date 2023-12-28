import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  url: process.env.DB_URL,
  port: process.env.PORT,
  env:process.env.NODE_ENV,
  default_password: process.env.DEFAULT_STUDENT_PASS,
  default_student_password:process.env.DEFAULT_PASS,
  default_role:process.env.DEFAULT_USER_ROLE,
}
