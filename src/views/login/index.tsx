
import style from './index.module.scss'
import { useSearchParams  } from 'react-router-dom'
import { Button, Form, Input } from "antd"
import http from '@/utils/http'
import { toFormData } from 'axios';

type FieldType = {
    username?: string;
    password?: string;
  };

export default function Login() {
    const [searchParams] = useSearchParams();
   const [form] = Form.useForm();
    

    
    

   
    function onSubmit() {
        // e.stopPropagation();
        form.validateFields().then((values) => {
            
            http.post('/cmict-sso/token/login', values).then((res) => {
                console.log(res)
            })
        }).catch((errorInfo) => {
            console.log(errorInfo)
        })
        
    }
    return (
        // <form className={style.login_form}>
        //     <FormItem item={usernameItem} onItemValueChange={setUsernameItem}></FormItem>
        //     <FormItem item={passwordItem} onItemValueChange={setPasswordItem}></FormItem>
        //     <Button className="login-button" type="primary" onClick={onSubmit}>登录</Button>
        // </form>
        <Form name="basic" form={form} labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }} className={style['login-form']} autoComplete="off">
            <Form.Item<FieldType> label="用户名"
                name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
            </Form.Item>
            <Form.Item<FieldType> label="密码"
                name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="login-button" type="primary" onClick={onSubmit}>登录</Button>
            </Form.Item>
        </Form>
    )
}