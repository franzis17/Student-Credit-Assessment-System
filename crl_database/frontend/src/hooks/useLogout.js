import { useAuthContext } from './useAuthContext.js'

export const useLogout = () => {

    const {dispatch} = useAuthContext()

    const logout = () => {

    //remove user
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})


    }

    return {logout}
}
