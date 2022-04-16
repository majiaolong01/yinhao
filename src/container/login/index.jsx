import React, {Component} from 'react'
import {JSEncrypt} from 'jsencrypt'
import {connect} from 'react-redux'
import $http from "../../service/config";
import './index.scss'
import {Input,Button,message} from 'antd'
import withRouter from '../../util/WithRouter';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            publicKey:''
        }

    }
    componentDidMount() {
        this.getPublicKey();
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login=()=>{
        const {username,password}=this.state;
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.state.publicKey);
        const param={
            username,
            password:encrypt.encrypt(password)
        }
        $http.login(param).then(res=>{
            if(res.code===200){
                message.success(res.message);
                window.sessionStorage.setItem("accessToken",res.accessToken);
               
               // const {navigate} = Navigate()
                this.props.rememberUser({...res.data,accessToken:res.accessToken});
                this.props.navigate('/product')
            }else{
                message.error(res.message)
            }
        })
    }

    getPublicKey=()=>{
        $http.getPublicKey().then(res=>{
            //console.log(res.data);
             if(res.code===200){
                  this.setState({
                      publicKey:res.data.publicKeyStr
                  })
             }
        })
    }

    render() {
        const {username,password}=this.state;
        return <div className="container">
                      <div className="login-box">
                          <div className="item">
                              <Input size="large" value={username} name="username" onChange={e=>this.handleChange(e)} placeholder="请输入用户名" /><br />

                          </div>
                          <div className="item">
                              <Input size="large" value={password} name="password" type="password" onChange={e=>this.handleChange(e)} placeholder="请输入密码" />
                          </div>
                          <Button type="primary" size="large" block onClick={()=>this.login()} >
                             提交
                          </Button>
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

  
