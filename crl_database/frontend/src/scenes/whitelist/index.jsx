import { useState } from 'react';
import './whitelist.css'


const Whitelist = () => {

    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const handleRoleChange = (event) => {
        setUserRole(event.target.value)
    }

    const handleWhitelist= async () => {
        if(email && userRole)
        {
            setIsLoading(true);

            try {

                const response = await fetch('http://localhost:5001/api/add-to-whitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',


                    },
                    body: JSON.stringify({email, userRole}),
     
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
        onChange={handleRoleChange}
    >
    <option value="">Select an option</option>
    <option value="Option1">Moderator</option>
    <option value="Option2">Staff</option>
    </select>

    <button disabled={handleWhitelist}> Add user to whitelist </button>

    </div>

    
    )

}

export default Whitelist