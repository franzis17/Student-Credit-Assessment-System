//If need to use authContext values on the state on any component -> invoke the hook and destructure the user from the context
//Can use dispatch function to perform dispatches and update the state
import { AuthContext } from '../context/AuthContext.js';
import { useContext } from 'react';

export const useAuthContext = () => { 
    const context = useContext(AuthContext)
    
    if (!context) {
        throw Error('useAuthContext must be used inside an AUTH Context Provider')
    }
    
    return context
}