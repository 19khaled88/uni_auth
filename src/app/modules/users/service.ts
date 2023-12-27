import config from "../../../config";
import { IUser } from "./interfaces";
import { User } from "./model";
import { generateUserId, generate_Student_Id } from "./utils";


const createUser = async(user:IUser):Promise<IUser | null>=>{
    console.log(user.role)

    const id = await generateUserId()
    // if(user.role === 'student'){
    //     const id = await generate_Student_Id()
    //     user.id = id
    // }
    user.id = id
    if(!user.password){
        user.password = config.default_password as string
    }
    const res = await User.create(user)
    if(!res){
        throw new Error('Failed to create user')
    }
    return res
}

export const userService = {
    createUser
}