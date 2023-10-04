import axios from "axios"

const instance = axios.create({ 
    baseURL: "http://localhost:5001",
    headers: {
        "Content-type": "application/json",
    }
})

let userToken = null

export const setToken  = (token) => {
    userToken = token
}

instance.interceptors.request.use(
    (config) => { 
        if(userToken) {
            config.headers.Authorization = `Bearer ${userToken}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default instance
