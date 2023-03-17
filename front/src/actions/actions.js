// we are making add action that will add input box value in global store that can access any component of app

export const setID=(data)=>{
    return {
        type:"set_fileID",
        // we are sending id to reducer
        payload:{
            data
        }
    }
}
export const updateID=(id)=>{
    return {
        type:"update_fileID",
        // we are sending updated id after deleting , to reducer
       id
    }
}
export const saveDoc=()=>{
    return {
        type:"save_fileID",
        // empty store on save
    }
}