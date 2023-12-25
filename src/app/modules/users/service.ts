import config from "../../../config";
import { IUser } from "./interfaces";
import { User } from "./model";
import { generateUserId } from "./utils";


const createUser = async(user:IUser):Promise<IUser | null>=>{

    const id =await generateUserId()

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