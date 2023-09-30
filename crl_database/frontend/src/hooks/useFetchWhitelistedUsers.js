import { useState, useEffect } from 'react';

export const useFetchWhitelistedUsers = () => {
    const [whitelistData, setWhitelistData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5001/api/whitelist/getWhitelistedUsers');
                const data = await response.json();
                setWhitelistData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [])



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

