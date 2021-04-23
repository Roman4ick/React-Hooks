import React, {useReducer} from 'react';
import { AlertContext } from './alertContext';
import { AlertReducer } from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../types';

export const AlertState = ({ children }) => {
    const [state, dispatch] = useReducer(AlertReducer, null)
    const hide = () => dispatch({type: HIDE_ALERT})
    const show = (text, type = 'secondary') => {
        dispatch({
            type: SHOW_ALERT,
            payload: {type, text}
        })
    }
    return (
        <AlertContext.Provider value={{
            show,
            hide,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
}