import React, {Component} from 'react'
import $http from "../../service/config";
import {Card, Col, Row,Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import withRouter from '../../util/WithRouter';
import './index.scss'
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param:{
                page:1,
                current:5
            },
            productList:[],
            isLoading:false

        }

    }

    componentDidMount() {
       // console.log(this.props)
        const {param}=this.state;
        this.getAllProduct(param);
    }

    getAllProduct=param=>{
        $http.getAllProduct(param).then(res=>{
            if(res.code===200){
                this.setState({
                    productList:res.data.list
                })
            }
        })
    }
    goEditProduct=item=>{
        this.props.navigate('/productEdit',{repalce:true,state:{param:item}})
    }
    download=item=>{
        const {imgurl}=item;
        const fileName=imgurl.slice(imgurl.lastIndexOf('/')+1);
        this.setState({isLoading:true});
        //console.log(fileName)
        $http.download({imgurl}).then(res=>{
            this.setState({isLoading:false});
            const blob = new Blob([res]);
            //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            //IE10以上支持blob但是依然不支持download
            if ('download' in document.createElement('a')) {
                //支持a标签download的浏览器
                const link = document.createElement('a')//创建a标签
                link.download = fileName//a标签添加属性
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)
                document.body.appendChild(link)
                link.click()//执行下载
                URL.revokeObjectURL(link.href) //释放url
                document.body.removeChild(link)//释放标签
            }else{
                navigator.msSaveBlob(blob, fileName)
            }
        })
    }
    render() {
        const {productList,isLoading}=this.state;
        const { Meta } = Card;
        return <div className="product">
                <Row gutter={16}>
                    {productList.map((item,index)=>(
                        <Col span={8} key={index}>
                            <Card bordered={false} actions={[
                                <EditOutlined  type="cloud-download" onClick={()=>this.download(item)}/>]} cover={<img alt={item.categrory} src={item.imgurl} style={{cursor:"pointer"} }  onClick={()=>this.goEditProduct(item)} />} >
                                <Meta  title={item.name} description={item.description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            <Spin className="loading" spinning={isLoading}/>
        </div>
    }
}

export default withRouter(Product)

  
