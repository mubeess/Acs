import {
    SET_LOADING,
    SET_ISLOGED,
    SET_STAFF,
    SET_CHAT,
    SET_CURRENT_ALERT,
    SET_NEWMESSAGE,
    SET_NEWALERT
   
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

           case SET_CURRENT_ALERT:
                            return {
                                ...state,
                                currentAlert:action.payload
                            }
           case SET_NEWMESSAGE:
                let prevMessage=state.newMessage
                return {
                    ...state,
                    newMessage:!prevMessage
                }
           case SET_NEWALERT:
                let prevAlert=state.newAlert
                return {
                    ...state,
                    newAlert:!prevAlert
                }
            
        default:
        return state;
    }
    
    }
    export default AppReducer;