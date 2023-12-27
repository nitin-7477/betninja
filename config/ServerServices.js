import axios from "axios"

const ServerURL = `${process.env.SERVERURL}`

// const ServerURL = "https://cbb5-2402-8100-2713-be78-1087-8b12-905e-9a09.ngrok-free.app"



const getData = async (url) => {
    try {
        var response = await axios.get(`${ServerURL}/${url}`)
        var result = await response.data
        console.log("This is the get result", result);
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