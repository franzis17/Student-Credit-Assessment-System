import { useState } from 'react';
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {

    /* if error with sign request*/
    const [error, setError] = useState(null)
    /*loading state - is true when starting the request*/
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAuthContext()


    const signup = async (email, password, username, role, curtinID) => {


        setIsLoading(true)
        setError(null)

            try {

            const response = await fetch('http://localhost:5001/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, username, role, curtinID})
            })

            if (response.status === 200) {
                // successful signup
                const json = await response.json()
                localStorage.setItem('user', JSON.stringify(json))

                // update the authentication context using authContext hook
                dispatch({type: 'LOGIN', payload: json})

                setIsLoading(false)

                return true

            } else {
                const errorResponse = await response.json()
                setIsLoading(false)
                setError(errorResponse?.error || 'An error occured when signing up- please contact admin')
                return false

            }
        } catch(error) {
            setIsLoading(false)
            setError('An error occured when signing up - please contact admin')
            console.error('Signup Error', error)
            return false
        }


    }


    return { signup, isLoading, error}
}