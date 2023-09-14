import WhitelistedUser from '../models/whitelistModel.js'
import registeredUsers from '../models/userModel.js'
import jwt from 'jsonwebtoken';


const createJsonTokenID = (_id, role) => {
    
        return jwt.sign({_id:_id, role: role}, process.env.JWT_KEY, {expiresIn: '3d'});
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
        const token = createJsonTokenID(wlUser._id)

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

            const token = createJsonTokenID(emailExists._id, userRole)

            res.status(200).json({ email, token, message: 'Successfully grabbed user role' });
     
     } else {

        res.status(400).send('No role indicated to that user account')

     }
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message})
    }
}


const updateRole = async (req, res)  => {
    

    const { email } = req.query // email as a URL parameter

    const { role } = req.body

    console.log('Received email:', email);
    console.log('Received role:', role);
    
    if (!email || !role) {
         return res.status(400).send("Email and role are required.");
     }
    
        try {

            const user = await WhitelistedUser.findOne({ email: email });
            console.log("Found user:", user);
    
            if (!user) {
                return res.status(404).send("User not found.");
            }

    
                user.role = role;
                console.log(role)

                await user.save();

                console.log("Updated user role:", user.role)
    
                return res.status(200).json({ message: "Role updated successfully." });


            
    
        } catch (error) {

            console.error("Error updating role:", error);
            return res.status(500).json({error:"Server error."});
        }
    }

export { addWhitelistedUser, checkWhitelistUser, getUserRole, updateRole }