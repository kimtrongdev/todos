import axios from 'axios'
import API_URL from './config'
const ApiCaller = async (enp, method = 'GET', data = null) => {
    const res = await axios({
        url: API_URL + enp,
        method: method,
        body: data ,
        params: data
    })
    res.then(function (res){
        console.log(res)
        
    }).catch(function (){

    })
    return res
}

export default ApiCaller