import './App.css';
import { useState, useEffect, useReducer, useCallback } from 'react'
import { TextField, Button, Pagination } from '@mui/material';
import * as React from 'react'
import Pages from './Pages'
import { AppStateContext } from './AppStateContext'

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const TOGGLE_SHOW_FAVORITES = 'TOGGLE_SHOW_FAVORITES'
export const UPDATE_RESULTS = 'UPDATE_RESULTS'
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'

const initialState = {
  favorites: [],
  showFavorites: false,
  results: [],
  currentPage: 1
}

export const AppReducer = (state = initialState ,action) => {
  switch(action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites,action.payload]
      }

    case REMOVE_FROM_FAVORITES:
      return  

    case TOGGLE_SHOW_FAVORITES:
      return {
        ...state,
        showFavorites: !state.showFavorites
      }

    case UPDATE_RESULTS: 
      return {
        ...state,
        results: action.payload
      }

    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }

      default:
        return
  }
}


function  App() {
  const [state, dispatch] = useReducer(AppReducer,initialState)
  const [userInput, setUserInput] = useState('software engineer')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if(state.showFavorites) {
      fetch(`https://api.giphy.com/v1/gifs?api_key=eXKQffH4EXcb9s1mMe8D8Eja6LAN1CEX&ids=${favorites.join(',')}`).then(response => response.json())
    .then(data => dispatch({ type: UPDATE_RESULTS, payload: data.data }))
      return
    }
    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=eXKQffH4EXcb9s1mMe8D8Eja6LAN1CEX&q=${userInput}`).then(response => response.json())
    .then(data => dispatch({ type: UPDATE_RESULTS, payload: data.data }))
  },[userInput,state.showFavorites,favorites])

  const addToFavorites = useCallback((id) => { 
    if(favorites.includes(id)) {
      let index = favorites.indexOf(id)
      let clone = [...favorites]
      delete clone[index]
      setFavorites(clone.filter(item => item !== undefined))
      return
    }

    setFavorites([...favorites,id]) },[favorites])
 
 

  return (
   <AppStateContext.Provider value={state}>
    <div className="App">
          <div className="content">
         <div style={{padding: '10px'}}>
          <TextField disabled={false} label="Search" color="secondary" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
         </div>
         <Button variant="outlined" onClick={() => dispatch({type: TOGGLE_SHOW_FAVORITES, payload: !state.showFavorites })}>{ `${state.showFavorites ? "Go Back To All Results": "Show Favorites"}`}</Button>
         <Pagination classes="margins" count={Math.ceil(state.results.length / 10)} onChange={(event,pageSelected) => dispatch({ type: CHANGE_CURRENT_PAGE, payload: pageSelected - 1 })} />
         <Pages results={state.results} currentPage={state.currentPage} addToFavorites={addToFavorites} favorites={favorites} />
      </div>
    </div>
  </AppStateContext.Provider>
  )
}

export default App
