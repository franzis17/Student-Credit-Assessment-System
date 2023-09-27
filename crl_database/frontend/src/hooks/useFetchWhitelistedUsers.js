import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext.js'

export const useFetchWhitelistedUsers = () => {
    const [whitelistData, setWhitelistData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        async function fetchData() {
            
            //Bearer token used to authorise if the user account logged in can view the data
            try {
                const response = await fetch('http://localhost:5001/api/whitelist/getWhitelistedUsers', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const data = await response.json();
                setWhitelistData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        if(user) {
            fetchData()
        }
    }, [user])



    const handleRemove = async (id) => {
        try {
           const response = await fetch(`http://localhost:5001/api/whitelist/delete/${id}`, {
              method: 'DELETE',
           });
           
           if (response.ok) {
              // Remove the deleted user from the state
              setWhitelistData(prevData => prevData.filter(user => user._id !== id));
           } else {
              console.error('Failed to remove user from whitelist');
           }
        } catch (error) {
           console.error('There was an error removing the user', error);
        }
     }


    return { whitelistData, loading, error, handleRemove }
}

