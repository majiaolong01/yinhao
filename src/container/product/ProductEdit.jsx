import React, {Component} from 'react'
import {Form,Input,Button,message,PageHeader}  from 'antd'
import {useNavigate } from "react-router-dom";
import UploadImage from '../../component/UploadImage'
import $http from '../../service/config'
import withRouter from '../../util/WithRouter';
import './index.scss'
class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param:props.location.state.param,
            imgurl:''
        }

    }
    componentDidMount() {
        this.formRef.setFieldsValue ({...this.state.param});
    }
    handleSubmit=e=>{
        e.preventDefault();
        this.formRef.validateFields((err, values) => {
            if (!err) {
                const {imgurl}=this.state;
                const {id}=this.state.param;
                /*console.log('Received values of form: ', values);
                console.log(this.state.imgurl);*/
                let param;
                if(imgurl){
                    param=Object.assign({},values.param,{imgurl,id});
                }else{
                    param=Object.assign({},values.param,{id});
                }
                this.updateProduct(param);
            }
        });
    }

    uploadFile=imgurl=>{
        //const param=Object.assign({},this.state.param,{})
        this.setState({
            imgurl
        })
    }

    updateProduct=param=>{
        $http.updateProduct(param).then(res=>{
            if(res.code===200){
                message.success('更新产品信息成功!');
                const navigate =useNavigate();
                navigate('/product')
            }
        })
    }

    render() {
        const formItemLayout={
            labelCol:{span:8},
            wrapperCol:{span:8}
        };
        const {param}=this.state;;
        const { TextArea } = Input;
        const {history}=this.props;
        return <div className="product">
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                onBack={() => history.goBack()}
                title="编辑商品"
                subTitle="修改商品信息"
            />
                <Form ref={elem=>{this.formRef=elem}} {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label='名称' 
                               name='name'
                               rules={[
                                        {
                                            required: 'true',
                                            message: '这是必填项',
                                        }
                                        ]}>
                       <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item label='类别'
                               name='categrory'         
                               rules={[
                                        {
                                            required: true,
                                            message: '这是必填项'
                                        }
                                      ]}>
                       <Input placeholder="请输入类别" />
                    </Form.Item>
                    <Form.Item label='价格'
                               name='price'
                               rules={[
                                {
                                    required: true,
                                    message: '这是必填项'
                                }
                               ]}>
                       <Input placeholder="请输入价格" />
                    </Form.Item>
                    <Form.Item label='数量'
                               name='num'
                               rules={[
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                               ]}>
                       <Input placeholder="请输入数量" />
                    </Form.Item>
                    <Form.Item label='图片'
                               name='imgurl'
                               rules={[
                                {
                                    required: true,
                                    message: '这是必填项'
                                }
                           ]} >   
                       <UploadImage url={param.imgurl} uploadFile={this.uploadFile}/>
                    </Form.Item>
                    <Form.Item label='描述'
                               name='description'
                               rules={[
                                {
                                    required: true,
                                    message: '这是必填项'
                                }
                               ]}>
                       <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 8, offset:8 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button type="success"  onClick={()=>history.goBack()} style={{marginLeft:'80px'}} >
                            返回
                        </Button>
                    </Form.Item>
                </Form>
              </div>
    }
}

export default withRouter(ProductEdit)

  
