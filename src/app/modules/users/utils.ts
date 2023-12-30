import { IAcademicSemester } from "../academicSemester/interface";
import { User } from "./model";

// export type IAcademicSemester ={
//     code:string,
//     year:number
// }
export const findLastUser =async()=>{
    const lastUser = await User.findOne({},{id:1, _id:0}).sort({
        createdAt: -1
    }).lean();

    return lastUser?.id
}

export const findLastStudentId=async():Promise<string | undefined>=>{
    const lastStudent = await User.findOne({role:'student'},{id:1, _id:0}).sort({
        createdAt: -1
    }).lean();
    
    return lastStudent?.id
}
export const findLastFacultyId=async():Promise<string | undefined>=>{
    const lastStudent = await User.findOne({role:'faculty'},{id:1, _id:0}).sort({
        createdAt: -1
    }).lean();

    return lastStudent?.id
}

export const findLastAdminId=async():Promise<string | undefined>=>{
    const lastStudent = await User.findOne({role:'admin'},{id:1, _id:0}).sort({
        createdAt: -1
    }).lean();

    return lastStudent?.id
}
export const findLastSuperAdminId=async():Promise<string | undefined>=>{
    const lastStudent = await User.findOne({role:'super_admin'},{id:1, _id:0}).sort({
        createdAt: -1
    }).lean();

    return lastStudent?.id
}




export const generateUserId =async()=>{
    const currentId = (await findLastUser()) || (0).toString().padStart(5, '0')
    const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

    return incrementId
}



export const generate_Student_Id =async(academicSemester:IAcademicSemester | null)=>{
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0')
    const isSplit = currentId.split('-')
   
    if(isSplit.length > 0){
        const splited = isSplit.length - 1
       
        let incrementId = (parseInt(isSplit[splited]) + 1).toString().padStart(5, '0')
        incrementId = `${academicSemester?.year}-${academicSemester?.code}-${incrementId}`

        return incrementId
    }else{
        let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
        incrementId = `${academicSemester?.year}-${academicSemester?.code}-${incrementId}`
    
        return incrementId
    }
    
    
}

export const generate_Faculty_Id=async()=>{
    const currentId = (await findLastFacultyId() || (0).toString().padStart(5, '0')) 
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `F-${incrementId}`
    
    return incrementId
}

export const generate_Admin_Id=async()=>{
    const currentId = (await findLastAdminId() || (0).toString().padStart(5, '0')) 
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `A-${incrementId}`
    
    return incrementId
}
export const generate_Super_Admin_Id=async()=>{
    const currentId = (await findLastSuperAdminId() || (0).toString().padStart(5, '0')) 
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `A-${incrementId}`
    
    return incrementId
}