import React from 'react'


export const AppStateContext = React.createContext({
    state: {},
    dispatch: () => null
});
