import React, {Children, useReducer, useEffect} from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import {
  SET_LOADING,
  SET_ISLOGED,
  SET_STAFF,
  SET_CHAT,
  SET_CURRENT_ALERT,
  SET_NEWALERT,
  SET_NEWMESSAGE,
} from '../types';

export default function AppState(props) {
  const initState = {
    staff: {},
    loading: false,
    isLogged: false,
    chatter: {},
    currentAlert: {},
    newMessage: false,
    newAlert: false,
  };
  const [state, dispatch] = useReducer(appReducer, initState);

  const setLoading = () => dispatch({type: SET_LOADING});
  const setIslogged = () => dispatch({type: SET_ISLOGED});
  const setStaff = staff => dispatch({type: SET_STAFF, payload: staff});
  const setChatter = chatter => dispatch({type: SET_CHAT, payload: chatter});
  const setCurrentAlert = curAlert =>
    dispatch({type: SET_CURRENT_ALERT, payload: curAlert});
  const setNewAlert = () => dispatch({type: SET_NEWALERT});
  const setNewMessage = () => dispatch({type: SET_NEWMESSAGE});

  return (
    <AppContext.Provider
      value={{
        staff: state.staff,
        loading: state.loading,
        isLogged: state.isLogged,
        chatter: state.chatter,
        currentAlert: state.currentAlert,
        newMessage: state.newMessage,
        newAlert: state.newAlert,
        setLoading,
        setIslogged,
        setStaff,
        setChatter,
        setCurrentAlert,
        setNewAlert,
        setNewMessage,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}
