import WhitelistedUser from '../models/whitelistModel.js'
import registeredUsers from '../models/userModel.js'
import jwt from 'jsonwebtoken';


const createJsonToken = (_id) => {
    
    return jwt.sign({_id:_id}, process.env.JWT_KEY, {expiresIn: '3d'})
    
}
// add whitelisted user account
const addWhitelistedUser = async (req, res) => {

    const {email, role} = req.body
    try {

        const emailExists = await WhitelistedUser.findOne({ email })

        if (emailExists) {
            return res.status(400).json({ error: 'Email already added to whitelist' })
          }

        const registeredUsrExists = await registeredUsers.findOne({email})
        
        if(registeredUsrExists) {
            return res.status(400).json({ error: 'A registered account has already been created and whitelisted with this email' })
        }

        const wlUser = await WhitelistedUser.create({email, role})

        //create a token for user
        const token = createJsonToken(wlUser._id)

        //token -> payload encoded, headers encoded, secret_token encoded
        res.status(200).json({email, token})

     } catch (error) {
     console.error('Error:', error);
     res.status(400).json({error: error.message})

 }

}

const checkWhitelistUser = async (req, res) => {

    const {email} = req.query

    try {

        const emailExists = await WhitelistedUser.findOne({ email })

        if(emailExists) {
            console.log("Email is whitelisted.");
            res.status(200).send('Account is approved by Admin')
        }
        else {
            console.log("Email is not whitelisted.");
            res.status(400).send('You have not been approved by Admin to have login access - please contact the Admin for support')
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message})
    }
}

const getUserRole = async (req, res)  => {


     const {email} = req.query
     //generate token to carry the user's role

     try {

        const emailExists = await WhitelistedUser.findOne({ email })

        if(emailExists) {

            const userRole = emailExists.role

            const token = createJsonToken(emailExists._id, userRole)
     
            res.status(200).json({email, token})
     } else {

        res.status(400).send('No role indicated to user')

     }
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message})
    }
}


export { addWhitelistedUser, checkWhitelistUser, getUserRole }