import axios from "axios"
const ServerURL = "https://2ca3-2401-4900-1c19-3fe4-4830-f817-540c-d0bd.ngrok-free.app"


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