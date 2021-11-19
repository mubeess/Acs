import {
    SET_LOADING,
    SET_ISLOGED,
    SET_STAFF,
    SET_CHAT
   
}from '../types'


const AppReducer= (state,action)=>{
    switch(action.type){
        case SET_LOADING:
            let prevLoad=state.loading
            return {
                ...state,
                loading:!prevLoad
            }
            case SET_ISLOGED:
                let prevLogged=state.isLogged
                return {
                    ...state,
                    isLogged:!prevLogged
                }
            case SET_STAFF:
                    return {
                        ...state,
                        staff:action.payload
                    }
            case SET_CHAT:
                        return {
                            ...state,
                            chatter:action.payload
                        }
            
        default:
        return state;
    }
    
    }
    export default AppReducer;