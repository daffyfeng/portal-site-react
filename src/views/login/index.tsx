import { useState } from "react"
import FormItem from "../components/formItem"
import './index.css'
import { useSearchParams  } from 'react-router-dom'

export default function Login() {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get('client_id'));
    console.log(searchParams.get('response_type'));
    console.log(searchParams.get('scope'));
    console.log(searchParams.get('redirect_uri'));
    

    const [usernameItem, setUsernameItem] = useState({name: '用户名', prop: 'username', value: ''})
    const [passwordItem, setPasswordItem] = useState({name: '密码', prop: 'password', value: ''})
    function onSubmit() {
        // e.stopPropagation();
        console.log(usernameItem);
        console.log(passwordItem);
        return false
    }
    return (
        <form className="login-form">
            <FormItem item={usernameItem} onItemValueChange={setUsernameItem}></FormItem>
            <FormItem item={passwordItem} onItemValueChange={setPasswordItem}></FormItem>
            <button className="login-button" type="button" onClick={onSubmit}>登录</button>
        </form>
    )
}