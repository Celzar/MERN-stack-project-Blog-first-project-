import Axios from 'axios'

const setAuthToken = (token) => {
    token ? Axios.defaults.headers.common["Authorization"] = token: delete Axios.defaults.headers.common["Authorization"];
} 

export default setAuthToken;