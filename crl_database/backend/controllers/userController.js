import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {sendVerificationEmail} from '../utils/sendVerificationEmail.js';

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

        const { role, username } = user;

        //create a token for user
        const token = createJsonToken(user._id)

        //token -> payload encoded, headers encoded, secret_token encoded
        res.status(200).json({username, email, token, role})

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


// sign up user account - after admin acceptance
const signupUser = async (req, res) => {

    const {email, password, username, role, curtinID} = req.body
    try {

        //Create token for email verification
        const emailToken = crypto.randomBytes(64).toString("hex")
        if(!username || !email || !password || !curtinID)
        {
            return res.status(400).json("All fields are required to signup")
        }

        else { 
            
            //await for user signup using all required fields for a user account
            const user = await User.signup(email, password, username, role, emailToken, curtinID)

            //verify email after signing up
            sendVerificationEmail(user)
        
            //create a token for user
            const token = createJsonToken(user._id)

            //token -> payload encoded, headers encoded, secret_token encoded
            res.status(200).json({email, token})

        }

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


const verifyEmail = async (req, res) => {

    try {

        const emailToken = req.body.emailToken

        if(!emailToken) {
            return res.status(404).json("Email token not found..")
        }

        const user = await User.findOne({emailToken})

        if(user) {
            user.emailToken = null
            user.isVerified = true

            await user.save()

            const token = createJsonToken(user._id)

            res.status(200).json( {
                _id: user._id,
                name: user.username,
                email: user.email,
                token,
                isVerified: user?.isVerified,
            })

        } else res.status(400).json("Email verification failed, invalid token!")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

        
}

const resendVerification = async (req, res) => {

    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email not found." })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified." })
        }


        user.emailToken = createJsonToken()
        await user.save();

        // Send the verification email with the new token
        // Implement this function to send the email
        sendVerificationEmail(user)

        res.status(200).json({ message: "Verification email resent successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const updateUserFields = async (req, res) => {

    const userId = req.params._id
    const updateData = req.body

    try {

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true})

        if (!user) {
            return res.status(400).send({ message: 'User not found'})
        }

        res.send(user)

    


    }  catch(error) {
           res.status(400).send({mesasge: erorr_message})
    }


}

export {signupUser, loginUser, verifyEmail, updateUserFields, resendVerification};


