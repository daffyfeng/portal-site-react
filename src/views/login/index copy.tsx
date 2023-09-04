import { useState, useEffect } from "react"
import FormItem from "../components/formItem"
import style from './index.module.scss'
import { useSearchParams  } from 'react-router-dom'
import { Button } from "antd"

export default function Login() {
    const [searchParams] = useSearchParams();

    

    useEffect(() => {
        console.log(searchParams.get('client_id'));
        console.log(searchParams.get('response_type'));
        console.log(searchParams.get('scope'));
        console.log(searchParams.get('redirect_uri'));
    }, [searchParams])
    

    const [usernameItem, setUsernameItem] = useState({name: '用户名', prop: 'username', value: ''})
    const [passwordItem, setPasswordItem] = useState({name: '密码', prop: 'password', value: ''})
    function onSubmit() {
        // e.stopPropagation();
        console.log(usernameItem);
        console.log(passwordItem);
        return false
    }
    return (
        <form className={style.login_form}>
            <FormItem item={usernameItem} onItemValueChange={setUsernameItem}></FormItem>
            <FormItem item={passwordItem} onItemValueChange={setPasswordItem}></FormItem>
            <Button className="login-button" type="primary" onClick={onSubmit}>登录</Button>
        </form>
    )
}