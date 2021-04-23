import React, { useReducer } from 'react';
import axios from 'axios';
import { GithubContext } from './githubContext';
import { githubReducer } from './githubReducer';
import { SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING } from '../types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const withCreds = url => {
    return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({ children }) => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    }
    const [state, dispatch] = useReducer(githubReducer, initialState)
    const search = async value => {
        setLoading()
        const respons = await axios.get(
            withCreds(`https://api.github.com/search/users?q=${value}&`
            )) 
        dispatch({
            type: SEARCH_USERS,
            payload: respons.data.items
        })
    }
    const getUser = async name => {
        setLoading()
        const respons = await axios.get(
            withCreds(`https://api.github.com/users/${name}?`
            ))
        dispatch({
            type: GET_USER,
            payload: respons.data
        })
    }
    const getRepos = async name => {
        setLoading()
        const respons = await axios.get(
            withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`
        ))
        dispatch({
            type: GET_REPOS,
            payload: respons.data
        })
    }
    const clearUsers = () => dispatch({ type: CLEAR_USERS })
    const setLoading = () => dispatch({ type: SET_LOADING })
    const {user, users, repos, loading} = state
    return (
        <GithubContext.Provider value={{
            search, clearUsers, setLoading, getRepos, getUser,
            user, users, repos, loading
        }}>
            {children}
        </GithubContext.Provider>
    )
}