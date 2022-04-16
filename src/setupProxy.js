const proxy = require('http-proxy-middleware');
const  proxyAddress=require('./service/proxyAddress')

module.exports = function(app) {
    proxyAddress.forEach(function(item,index){
        app.use(proxy(item.context, {
            target: item.target,
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                ['^'+item.context]: "/"
            },
        }))
    })
};