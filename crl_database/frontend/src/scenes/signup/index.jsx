//User signs themselves up -> need email whitelist first

import { useState } from 'react';
import { useSignup } from "../../hooks/useSignup"
import "./signup.css";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()


    const handle = async(e) => {

        e.preventDefault()

            await signup(email, password, username)
        
    }


    return (
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


        <button disabled={isLoading}>Signup</button>
        {error && <div className="error">{error}</div>}
        </form>
    )

}

export default Signup
