import{Route,Routes,BrowserRouter } from 'react-router-dom'
import AsyncComponent from '../util/AsyncComponent';
import React from "react";
const Login=AsyncComponent(()=>import("../container/login/index"));
const Message=AsyncComponent(()=>import("../container/message/index"));
const Product=AsyncComponent(()=>import("../container/product/index"));
const ProductEdit=AsyncComponent(()=>import("../container/product/ProductEdit"))
const routerList=[
    {
        path:'/',
        component:Login
    },{
       path:'/message',
        component:Message
    },{
        path:'/product',
        component:Product
    },{
       path:'/productEdit',
       component:ProductEdit
    }
]
const Routers=()=>(
    <BrowserRouter>
        <Routes>
            {routerList.map((item,index)=>(
                item.path==='/'?<Route exact path={item.path} key={index} component={item.component}/>:<Route path={item.path} key={index} component={item.component}/>
            ))}
        </Routes>
    </BrowserRouter>
)

export default Routers;