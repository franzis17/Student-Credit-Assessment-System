import whitelist from '../models/whitelistModel.js'

// add whitelisted user account
const addWhitelistedUser = async (req, res) => {

    const {email, role} = req.body
    try {

        const user = await whitelist.signup(email, role)

    } catch (error) {
        console.error('Error: ', error)

    }

}


export { addWhitelistedUser }