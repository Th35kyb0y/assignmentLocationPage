const initial={
    ids:[]
}
 const add=(state=initial, action)=>{
switch(action.type){
case "set_fileID" :
    const id=action.payload.data
    return {
        ...state,
        ids:[
            ...state.ids,
            id
        ]
    }
    case "update_fileID" :
       const newIDs=state.ids.filter((elem)=>elem!==action.id) 
    return {
        ...state,
       ids:newIDs
    }
    case "save_fileID":
        return{
            ...state,
            ids:[]
        }
    default : return state
}
}
export default add
