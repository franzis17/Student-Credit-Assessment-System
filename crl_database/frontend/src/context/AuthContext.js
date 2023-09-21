import { createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext()

//Export to use in other files later
export const authReducer = (state, action) => { 
    //Login and logout case
    //create actions based on the payload information from the server
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    /* make sure user stays logged in after refreshing page*/
    /*use effect once - check for token just once in local storage*/
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }

    }, []) 

    console.log('AuthContext state:;', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

    
}