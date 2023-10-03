import WhitelistedUser from '../models/whitelistModel.js'
import registeredUsers from '../models/userModel.js'
import jwt from 'jsonwebtoken';


const createJsonTokenID = (_id, role) => {
    
        return jwt.sign({_id:_id, role: role}, process.env.JWT_KEY, {expiresIn: '3d'});
    }
    
// add whitelisted user account
const addWhitelistedUser = async (req, res) => {

    const {curtinID, role} = req.body
    try {

        const idExists = await WhitelistedUser.findOne({ curtinID })

        if (idExists) {
            return res.status(400).json({ error: 'ID already added to whitelist' })
          }

        const registeredUsrExists = await registeredUsers.findOne({curtinID})
        
        if(registeredUsrExists) {
            return res.status(400).json({ error: 'A registered account has already been created and whitelisted with this ID' })
        }

        const wlUser = await WhitelistedUser.create({curtinID, role})

        //create a token for user
        const token = createJsonTokenID(wlUser._id)

        //token -> payload encoded, headers encoded, secret_token encoded
        res.status(200).json({curtinID, role, token, _id: wlUser._id})

     } catch (error) {
     console.error('Error:', error);
     res.status(400).json({error: error.message})

 }

}

const checkWhitelistUser = async (req, res) => {

    const {curtinID} = req.query

    try {

        const idExists = await WhitelistedUser.findOne({ curtinID })

        if(idExists) {
            console.log("User is whitelisted.");
            res.status(200).send('Account is approved by Admin')
        }
        else {
            console.log("User is not whitelisted.");
            res.status(400).send('You have not been approved by Admin to have login access - please contact the Admin for support')
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message})
    }
}

const getUserRole = async (req, res)  => {


     const {curtinID} = req.query
     //generate token to carry the user's role

     try {

        const idExists = await WhitelistedUser.findOne({ curtinID })

        if(idExists) {

            const userRole = idExists.role

            const token = createJsonTokenID(idExists._id, userRole)

            res.status(200).json({ curtinID, token, message: 'Successfully grabbed user role' });
     
     } else {

        res.status(400).send('No role indicated to that user account')

     }
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message})
    }
}


const updateRole = async (req, res)  => {
    

    const { curtinID } = req.query // ID as a URL parameter

    const { role } = req.body

    console.log('Received ID:', curtinID);
    console.log('Received role:', role);
    
    if (!curtinID || !role) {
         return res.status(400).send("ID and role are required.");
     }
    
        try {

            const user = await WhitelistedUser.findOne({ curtinID: curtinID });
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