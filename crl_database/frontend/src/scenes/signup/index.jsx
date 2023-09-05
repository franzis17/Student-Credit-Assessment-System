//User signs themselves up -> need email whitelist first
import { useState, useEffect } from 'react';
import { useSignup } from "../../hooks/useSignup"
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import { useWhitelistCheck } from '../../hooks/useWhitelistCheck';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const navigate = useNavigate();
    const { isWhitelisted } = useWhitelistCheck(email)
    const [showAccessDeniedMessage, setShowAccessDeniedMessage] = useState(false)

    useEffect(() => {
        //Run when component mounts and calls whitelist function to initialise state
        const storedState = localStorage.getItem('showAccessDeniedMessage')
        if (storedState) {
            setShowAccessDeniedMessage(JSON.parse(storedState))
        }

    }, [email])
    
    
    const handle = async(e) => {

        console.log(isWhitelisted)

        if(!isWhitelisted)
        {
            setShowAccessDeniedMessage(true);
            localStorage.setItem('showAccessDeniedMessage', JSON.stringify(true))

        } else {

            e.preventDefault()
            //Clear local storage for access denied message
            localStorage.removeItem('showAccessDeniedMessage')

            const signupSuccessful = await signup(email, password, username)
    
             if (signupSuccessful) {
                console.log("Signup successful");
                navigate('/dashboard');
            
               } else {
                console.log("Signup not successful");
              }
        }
       
        
    }


    return (
        <div>
            {showAccessDeniedMessage && (
                <div className="access-denied-message">
                    You do not have authorized access. Please contact the admin.
                </div>
            )}
        <form className="signup" onSubmit={handle}> 
        <h3> Sign up</h3>

        <label>Username:</label>
        <input 
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
        />

        <label>Email:</label>
        <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <label>Password:</label>
        <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />


        <button disabled={isLoading} onClick={handle}>Signup</button>
        {error && <div className="error">{error}</div>}
        </form>
      </div>
     
    )

}

export default Signup
