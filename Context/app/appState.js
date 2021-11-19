import React,{Children, useReducer,useEffect} from 'react'
import AppContext from './appContext'
import appReducer from './appReducer'
import {
SET_LOADING,
SET_ISLOGED,
SET_STAFF,
SET_CHAT,
SET_CURRENT_ALERT
} from '../types'


export default function AppState(props){
    const initState={
        staff:{},
        loading:false,
        isLogged:false,
        chatter:{},
        currentAlert:{}
    }
const [state,dispatch]=useReducer(appReducer,initState)

const setLoading=()=>dispatch({type:SET_LOADING})
const setIslogged=()=>dispatch({type:SET_ISLOGED})
const setStaff=(staff)=>dispatch({type:SET_STAFF,payload:staff})
const setChatter=(chatter)=>dispatch({type:SET_CHAT,payload:chatter})
const setCurrentAlert=(curAlert)=>dispatch({type:SET_CURRENT_ALERT,payload:curAlert})

return <AppContext.Provider
value={{
    staff:state.staff,
    loading:state.loading,
    isLogged:state.isLogged,
    chatter:state.chatter,
    currentAlert:state.currentAlert,
    setLoading,
    setIslogged,
    setStaff,
    setChatter,
    setCurrentAlert
}}
>

    {props.children}
</AppContext.Provider>

}
