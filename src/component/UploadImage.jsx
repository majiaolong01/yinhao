import React, {Component} from 'react'
import {message} from 'antd'
import './uploadImage.scss'
import $http from "../service/config";
class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
             url:props.url,
             refreshUrl:''
        }

    }
    uploadImage=e=>{
        const file=e.target.files[0];
        const  fileReader = new FileReader();
        const imgTypeList=['image/gif','image/png','image/jpeg'];
        if(!file){
            message.error('请选择上传图片！');
            this.setState({refreshUrl:''});
            this.props.uploadFile(null)
            return false;
        }
        if(file&&imgTypeList.indexOf(file.type)!==-1){
            fileReader.readAsDataURL(file);
            fileReader.onload =event=> {
                this.setState({refreshUrl:event.target.result});
                this.upload(file)
            };
        }else{
            message.error('上传图片格式不正确！');
            this.setState({refreshUrl:''});
            this.props.uploadFile(null)
            return false;
        }

    }
    upload=file=>{
        const fd=new FormData();
        fd.append('file',file);
        $http.upload(fd).then(res=>{
            if(res.code===200){
              //  console.log(res.data);
                message.success('上传图片成功！')
                this.props.uploadFile(res.data.imgurl);
            }
        })
    }
    render() {
        const {url,refreshUrl}=this.state;
        return <div className="upload-container">
                   <img src={url} alt=""/>
                   <span>
                        <input type="file" onChange={e=>this.uploadImage(e)}/>
                        <img src={refreshUrl} id='img' alt=""/>
                   </span>
               </div>
    }
}

export default UploadImage

  
