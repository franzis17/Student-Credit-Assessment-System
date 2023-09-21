import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin.js';
import styles from './LoginForm.css';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';


//User signs themselves up -> need email whitelist first


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    
    const navigate = useNavigate();

    const handle = async(e) => {

        e.preventDefault()

        const loginSuccessful = await login(email, password)

        if (loginSuccessful) {
            console.log(email)
            navigate('/dashboard');
        }
       
    }

    return (
        
        <div>
            <div className = "Title">

              <h2 className>CRL Student Database</h2>
              <h3>Please enter your login details below</h3>

            </div>
            
            <form className="login" onSubmit={handle}> 

            <div className="input-container"> 
                <label>Email:</label>
            </div>
            <div className="input-icon"> 
                <span className="material-icons"><PersonIcon style={{ fontSize: 50, color: '#007bff' }}/></span>
                <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                />
            </div>

            <div className="input-container">
            <label>Password:</label>
            </div>
            <div className="input-icon">
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
            
            />
           </div>

           <button disabled={isLoading}>Login </button> 
           {error && <div className="error">{error}</div>}

           
           </form>
       </div>
    )

}

export default Login
