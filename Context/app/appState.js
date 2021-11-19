import React,{Children, useReducer,useEffect} from 'react'
import AppContext from './appContext'
import appReducer from './appReducer'
import {
SET_LOADING,
SET_ISLOGED,
SET_STAFF,
SET_CHAT
} from '../types'


export default function AppState(props){
    const initState={
        staff:{},
        loading:false,
        isLogged:false,
        chatter:{}
    }
const [state,dispatch]=useReducer(appReducer,initState)

const setLoading=()=>dispatch({type:SET_LOADING})
const setIslogged=()=>dispatch({type:SET_ISLOGED})
const setStaff=(staff)=>dispatch({type:SET_STAFF,payload:staff})
const setChatter=(chatter)=>dispatch({type:SET_CHAT,payload:chatter})

return <AppContext.Provider
value={{
    staff:state.staff,
    loading:state.loading,
    isLogged:state.isLogged,
    chatter:state.chatter,
    setLoading,
    setIslogged,
    setStaff,
    setChatter
}}
>

    {props.children}
</AppContext.Provider>

}
