import { useState } from 'react';
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    /* if error with sign request*/
    const [error, setError] = useState(null)
    /*loading state - is true when starting the request*/
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAuthContext()

    const signup = async (email, password, username, role) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5001/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, username, role})
        })
        const json = await response.json() 

        if (!response.ok) {
            setIsLoading(false)
            setError(json?.error || 'An error occured')
        }

        if(response.ok){
            //local storage user saving - save json web token to local so when user closes browser and comes back on
            localStorage.setItem('user', JSON.stringify(json))

            // update the authentication context using authContext hook
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }

    }


    return { signup, isLoading, error}
}