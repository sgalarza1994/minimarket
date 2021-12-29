
import axios from 'axios';
const adminAxios = axios.create({
    baseURL : 'http://localhost:5001/api/'
   // baseURL: 'http://localhost:7864/api/'
})

const forestalAxios = axios.create({
    baseURL : 'http://18.191.41.241:1003/api/'
    //baseURL : 'http://localhost:7866/api/'
})

export {adminAxios,forestalAxios};