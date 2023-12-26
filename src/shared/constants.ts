export const paginationFields =['page','limit','sortBy','sortOrder']
export const filterFields = ['searchTerm','title','code','year']
export const academicSearchableFields=['title','code','startMonth','endMonth']
export type IGenericResponse<T> ={
    meta:{
        page:number,
        limit:number,
        total:number
    },
    data:T
}

