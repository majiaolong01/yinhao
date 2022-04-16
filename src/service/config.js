import axios from 'axios'
import ReactDOM from 'react-dom/client';

import {message,Spin} from 'antd'
const loading = ()=>{
    const loadingContainer = document.createElement('div');
    loadingContainer.setAttribute('id', 'loading');
    document.body.appendChild(loadingContainer);
    const loadingNode=ReactDOM.createRoot(loadingContainer);
    loadingNode.render(<Spin />);
}
const Loaded=()=>{
    document.querySelector('body').removeChild(document.querySelector('#loading'))
}
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
    loading();//loading
    const access_token=sessionStorage.getItem('accessToken');
   if(access_token)  config.headers.common["access_token"]=access_token;
    return config;
}, function(error) {

    return Promise.reject(error);
});
axios.interceptors.response.use(function(config) {
    Loaded();//loaded
    if(config.data.code!=1){
        message.error(config.data.msg);

    }
    return config.data;
}, function(error) {
    Loaded();
    message.error('服务器故障！');
    // Do something with response error
    return Promise.reject(error);
});
const $http = {
    getQQCode: param=> {
        return axios.post('/api/uomg/api/qq.info?qq='+param.qq);
    },
    login:data=>{
        return axios.post('/api/admin-server/login',data);
    },
    download:data=>{
        return axios.post('/api/admin-server/product/download',data,{responseType: 'blob'});
    }
}
export default $http;