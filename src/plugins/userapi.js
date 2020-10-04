import Axios from "axios"

const axios = Axios.create({ withCredentials: false })

axios.interceptors.request.use(function (request) {
    console.log(request)
    return request
})

axios.interceptors.response.use(function (response) {
    console.log("RESPONSE:::", response)
    return response
}, function (error) {
    console.error(error)
    return error
})


async function login(username, password) {
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/users/auth`,
        method: "POST",
        data: {
            username, password
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data
        if (data.token) {
            sessionStorage.setItem("token", data.token);
            window.appGlobals.token = data.token;
            return data.token
        }
        
        alert("Could not login");
        return false
    } catch (err) {
        alert("Could not login");
        return false
    }
}


async function getAllDocuments(){
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/documents`,
        method: "GET",
        headers: {
            "Authorization": window.appGlobals.token || sessionStorage.getItem("token")
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data
        return resp.data
    } catch (err) {
        return false
    }
}


async function getDocumentById(id){
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/documents/${id}`,
        method: "GET",
        headers: {
            "Authorization": window.appGlobals.token || sessionStorage.getItem("token")
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data
        return resp.data
    } catch (err) {
        return false
    }
}


async function addNewDocument(name, content){
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/documents`,
        method: "POST",
        headers: {
            "Authorization": window.appGlobals.token || sessionStorage.getItem("token")
        },
        data: {
            name, content
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data
        return resp.data
    } catch (err) {
        return false
    }
}




async function whoami(id){
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/users/whoami`,
        method: "GET",
        headers: {
            "Authorization": window.appGlobals.token || sessionStorage.getItem("token")
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data
        return resp.data
    } catch (err) {
        return false
    }
}




async function addUser(username, password, email, avatar) {
    const options = {
        url: `${process.env.VUE_APP_BASE_API_URL}/users`,
        method: "POST",
        data: {
            username, password, email, avatar
        }
    }

    try {
        const resp = await axios(options);
        const data = resp.data

        alert("Registration Success");
        return data
    } catch (err) {
        alert("Registration Failure");
        return false
    }
}

export default {
    login, getAllDocuments, addNewDocument, getDocumentById, whoami, addUser
}