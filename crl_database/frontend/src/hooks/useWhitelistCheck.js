import { useState, useEffect } from 'react';


export const useWhitelistCheck = (initialEmail) => {

    const [isWhitelisted, setIsWhitelisted] = useState(false);

    useEffect(() => {
        // Make a request to check if the email is whitelisted when the component mounts
        const checkWhitelist = async () => {

            try {
                const response = await fetch(`http://localhost:5001/api/whitelist/checkWhitelist?email=${initialEmail}`)
                if (response.status === 200) {
                    setIsWhitelisted(true);
                } else {
                    setIsWhitelisted(false);
                }
            } catch (error) {
                console.error('Error: ', error);
                setIsWhitelisted(false);
            }
        }

        // Call the function to check whitelist
        checkWhitelist();
    }, [initialEmail]);

    return { isWhitelisted };
};

