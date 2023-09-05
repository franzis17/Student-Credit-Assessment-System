import { useState } from 'react';
import './whitelist.css'


const Whitelist = () => {

    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleWhitelist= async () => {

        if(email && userRole)
        {
            setIsLoading(true);

            try {


                const response = await fetch('http://localhost:5001/api/whitelist/addUserEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',


                    },
                    body: JSON.stringify({email, role: userRole}),
     
                });

                if(response.ok) {

                setEmail('')
                setUserRole('')
                }
                else {
                    console.error('Failed to add whitelist')
                }
                
            } catch(error) {
                console.error('Error: ', error)
            } finally {
                setIsLoading(false)
            }

        }
    }


return (
  

    <div classname="admin-whitelist">
   

     <label>Email:</label>
     <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email..."
    />

    <label>User Role:</label>

    <select 
        value={userRole} 
        onChange={(e) => setUserRole(e.target.value)}
        placeholder = "Select an option"
    >
    <option value="Staff">Staff</option>
    <option value="Moderator">Moderator</option>
    </select>

    <button disabled={isLoading} onClick={handleWhitelist}> Add user to whitelist </button>

    </div>

    
    )

}

export default Whitelist