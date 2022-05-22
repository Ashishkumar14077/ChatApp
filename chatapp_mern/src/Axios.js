import Axios from 'axios'
const instance = Axios.create({
    baseURL:"http://localhost:9000",
})

export default instance;