import React, {Component} from 'react'
import {Form,Input,Button,message,PageHeader}  from 'antd'
import UploadImage from '../../component/UploadImage'
import $http from '../../service/config'
import './index.scss'
@Form.create()
class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param:props.history.location.state.param,
            imgurl:''
        }

    }
    componentDidMount() {
        console.log(this.state)
    }
    handleSubmit=e=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
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
                const {history}=this.props;
                history.push('/product')
            }
        })
    }

    render() {
        const {getFieldDecorator}=this.props.form;
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
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label='名称'>
                        {
                            getFieldDecorator('param.name', {
                                initialValue:param.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<Input placeholder="请输入商品名称" />)
                        }
                    </Form.Item>
                    <Form.Item label='类别'>
                        {
                            getFieldDecorator('param.categrory', {
                                initialValue:param.categrory,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<Input placeholder="请输入类别" />)
                        }
                    </Form.Item>
                    <Form.Item label='价格'>
                        {
                            getFieldDecorator('param.price', {
                                initialValue:param.price,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<Input placeholder="请输入价格" />)
                        }
                    </Form.Item>
                    <Form.Item label='数量'>
                        {
                            getFieldDecorator('param.num', {
                                initialValue:param.num,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<Input placeholder="请输入数量" />)
                        }
                    </Form.Item>
                    <Form.Item label='图片'>
                        {
                            getFieldDecorator('param.imgurl', {
                                initialValue:param.imgurl,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<UploadImage url={param.imgurl} uploadFile={this.uploadFile}/>)
                        }
                    </Form.Item>
                    <Form.Item label='描述'>
                        {
                            getFieldDecorator('param.description', {
                                initialValue:param.description,
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }
                                ]
                            })(<TextArea rows={4} />)
                        }
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

export default ProductEdit

  
