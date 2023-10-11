
export const whitelistCheck = async (initialCurtinID) => {

    try {
        const response = await fetch(`http://localhost:5001/api/whitelist/checkWhitelist?curtinID=${initialCurtinID}`)
        if (response.status === 200) {
             return true
        } else {
            return false
        }
    } catch (error) {
    console.error('Error: ', error);
    return false
    }
        
        }

        