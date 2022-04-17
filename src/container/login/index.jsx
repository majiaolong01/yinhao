import React, {Component} from 'react'
// import {JSEncrypt} from 'jsencrypt'
import {connect} from 'react-redux'
import $http from "../../service/config";
import './index.scss'
import {Input,Button,message} from 'antd'
import withRouter from '../../util/WithRouter';
class Login extends Component {
    constructor(props) {
        super(props);
        this.defaultImg= require('../../asset/image/qq.jpg');
        this.state = {
            qq:'',
            qlogo:this.defaultImg,
            name:'',
            show:false
        }

    }
    componentDidMount() {
    //     const {qq}= this.state;
    //    this.getQQInfo({qq});
    }
    getQQInfo(param){
        $http.getQQCode(param).then(res=>{
           if(res.code == 1){
               const {qq,name,qlogo} = res;
               this.setState({
                 qq,name,qlogo,show:true
               })
           }
        })
    }
    handleChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleBlur=e=>{
        this.getQQInfo({qq:e.target.value})
    }
    render() {
        const {qq,name,qlogo,show}=this.state;
        return <div className="container">
                      <div className="login-box">
                          <h1>QQ号查询</h1>
                          <div className="item">
                             QQ  <input type="text" value={qq} name="qq" onFocus={e=>this.setState({show:false})} onChange={e=>this.handleChange(e)} onBlur={e=>this.handleBlur(e)} placeholder="请输入qq号" />
                          </div>
                          {show?<div className="card">
                              <img src={qlogo} alt="" />
                              <div className="detail">
                                    <span>{name}</span>
                                    <span>{qq}</span>
                              </div>
                          </div>:null}
                      </div>
               </div>
    }
}
const mapStateToProps = (state) =>{
    return {
        username:state.user.username  //store的值添加到state
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        rememberUser:(data)=>dispatch({type:"LOGIN",payload:data})
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))

  
