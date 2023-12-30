
export const gender =['male','female']
export type IGender ='male' | 'female'
export type IBloodGroup='O+'|'O-'|'A+'|'A-'|'AB+'|'AB-'
export const bloodGroup =['O+','O-','A+','A-','AB+','AB-']

export const filterFields = ['searchTerm','gender','contactNo','presentAddress']
export const studentSearchableFields=['bloodGroup','dateOfBirth','contactNo','emergencyContactNo']

export type IFilters ={
    searchTerm?:string | number
    gender?:IGender
    contactNo?:string 
    presentAddress?:string
}