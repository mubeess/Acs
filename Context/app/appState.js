import React,{Children, useReducer,useEffect} from 'react'
import AppContext from './appContext'
import appReducer from './appReducer'
import {
SET_LOADING,
SET_ISLOGED,
SET_STAFF
} from '../types'


export default function AppState(props){
    const initState={
        staff:{},
        loading:false,
        isLogged:false
    }
const [state,dispatch]=useReducer(appReducer,initState)

const setLoading=()=>dispatch({type:SET_LOADING})
const setIslogged=()=>dispatch({type:SET_ISLOGED})
const setStaff=(staff)=>dispatch({type:SET_STAFF,payload:staff})

return <AppContext.Provider
value={{
    staff:state.staff,
    loading:state.loading,
    isLogged:state.isLogged,
    setLoading,
    setIslogged,
    setStaff
}}
>

    {props.children}
</AppContext.Provider>

}
