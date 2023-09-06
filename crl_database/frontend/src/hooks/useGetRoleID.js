import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


export const useGetRoleID = (email) => { 

    const [userRole, setUserRole] = useState(null)

    useEffect(() => {

        const getRoleID = async () => {

            try {

                const response = await fetch(`http://localhost:5001/api/whitelist/getUserRole?email=${email}`) 

                if(response.status === 200) {

                    const data = await response.json()
                    console.log("Fetched Data: ", data)
                    const token = data.token

                    const decodedToken = jwt_decode(token)
                    console.log("Decoded right after creation: ", decodedToken)
                    const role = decodedToken.role
                    console.log(role)

                    console.log('setting', role)
                    setUserRole(role)
                    

                }
                else {
                    throw new Error('Unexpected response for status')
                }
            } catch (error) {

                console.error('Error: ', error);
                
            }
        }

       getRoleID();
    

        
    }, [email]);


    const updateRole = async (email, newRole) => {

        try {

            const response = await fetch(`http://localhost:5001/api/whitelist/updateRole?email=${email}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
              });

              const responseData = await response.json()
    
            if(response.status === 200) {
                setUserRole(newRole)
            }
            else
            {
                const errorMsg = responseData.error || 'Unauthorised access- no user role defined'
                throw new Error(errorMsg)
            }

        } catch(error) {
            console.error('Error', error)

        
    }


 }

   return { userRole, updateRole }
}

