import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const {dispatch} = useAuthContext()

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5001/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })


    const json = await response.json()
  
    if (response.status === 401) {
      setIsLoading(false)
      navigate('/verifyemail');
      return { isSuccess: false,
      isVerified: false };
    }

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      return false;
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      return {
          isSuccess: true,
          isVerified: json.isVerified
      }
    }
  }

  return { login, isLoading, error };
}