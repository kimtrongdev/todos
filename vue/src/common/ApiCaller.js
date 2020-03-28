import axios from 'axios'
import API_URL from './config'
import { Message } from 'element-ui';
import Router from './../router/index'
const ApiCaller = async (enp, method = 'GET', data = null) => {
    return new Promise((resol,reject)=>{
        axios({
            url: API_URL + enp,
            method: method,
            body: data ,
            params: data
        }).then((res)=>{
            if(res.data.message)
                Message.success({message: res.data.message})
            resol(res)
        }).catch(function (er){
            if(er.response && er.response.data.message){
                Message.error({message: er.response.data.message})
                if(er.response.status === 401){
                    Router.push({path:'/login'})
                }
            } 
            reject(er)
        })
    })
}

export default ApiCaller