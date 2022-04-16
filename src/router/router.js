import{Route,BrowserRouter,Routes } from 'react-router-dom'
import React from "react";
import AsyncComponent from '../util/AsyncComponent';
const Login=AsyncComponent(()=>import("../container/login/index"));
// const Message=AsyncComponent(()=>import("../container/message/index"));
const routerList=[
    {
        path:'/',
        component:<Login/>
    }
    // ,{
    //    path:'/message',
    //     component:<Message/>
    // }
]
const Routers=()=>(
    <BrowserRouter>
        <Routes>
        {routerList.map((item,index)=>(
                item.path==='/'?<Route exact path={item.path} key={index} element={item.component}/>:<Route path={item.path} key={index} element={item.component}/>
            ))}
        </Routes>
    </BrowserRouter>
)

export default Routers;