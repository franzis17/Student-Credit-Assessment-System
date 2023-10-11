import jwt_decode from 'jwt-decode';


export const getRoleID = async (curtinID) => { 


        try {

            const response = await fetch(`http://localhost:5001/api/whitelist/getUserRole?curtinID=${curtinID}`) 

            if(response.status === 200) {

                const data = await response.json()
                console.log("Fetched Data: ", data)
                const token = data.token

                 const decodedToken = jwt_decode(token)
                 console.log("Decoded right after creation: ", decodedToken)
                 const role = decodedToken.role
                 console.log(role)

                 console.log('setting', role)

                 return decodedToken.role
                    

                }
                else {
                    throw new Error('Unexpected response for status')
                }
            } catch (error) {

                console.error('Error: ', error);
                
            }
        }




export const updateRole = async (curtinID, newRole) => {

        try {

            const response = await fetch(`http://localhost:5001/api/whitelist/updateRole?curtinID=${curtinID}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
              });

    
    
            if(response.status !== 200) {

                const responseData = await response.json()
                const errorMsg = responseData.error || 'Unauthorised access- no user role defined'
                throw new Error(errorMsg)
            }
                

        } catch(error) {
            console.error('Error', error)

        
    }
}