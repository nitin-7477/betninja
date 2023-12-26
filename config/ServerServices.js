import axios from "axios"

// const ServerURL = `${process.env.SERVERURL}`
const ServerURL = 'https://0cd4-2402-8100-3850-6c53-b92f-7e21-7113-4f18.ngrok-free.app'


const getData = async (url) => {
    try {
        var response = await axios.get(`${ServerURL}/${url}`)
        var result = await response.data
        return result
    }
    catch (e) { return null }
}

const postData = async (url, body) => {
    try {
        var response = await axios.post(`${ServerURL}/${url}`, body)

        var result = await response.data
        return result
    }
    catch (e) { return null }
}




export { ServerURL, getData, postData }