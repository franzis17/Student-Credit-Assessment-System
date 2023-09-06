import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';

//JSON token creation using token password
const createJsonToken = (_id) => {
    
    return jwt.sign({_id:_id}, process.env.JWT_KEY, {expiresIn: '3d'})
    
}

// login user 
const loginUser = async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {

        const user = await User.login(email,password)

        //create a token for user
        const token = createJsonToken(user._id)

        //token -> payload encoded, headers encoded, secret_token encoded
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


// sign up user account - after admin acceptance
const signupUser = async (req, res) => {

    const {email, password, username, role} = req.body
    try {

        const user = await User.signup(email, password, username, role)
        //create a token for user
        const token = createJsonToken(user._id)

        //token -> payload encoded, headers encoded, secret_token encoded
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


export {signupUser, loginUser};


