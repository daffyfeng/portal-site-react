import style from './index.module.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import http from '@/utils/http';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { setUser } from '@/redux/actions/userInfo';

type FieldType = {
  name?: string;
  pwd?: string;
};

const Context = React.createContext({ name: 'Default' });

const Login = ({ setUser }: any) => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const params = {
    client: getParam('client', ''),
    redirect: getParam('redirect', ''),
    mode: getParam('mode', ''),
  };

  useEffect(() => {
    if (params.client && params.redirect) redirectUrl();
  }, []);

  function redirectUrl() {
    http
      .post('/server/sso/getRedirectUrl', params, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
      .then(({ data }) => {
        if (data.code == 200) {
          location.href = decodeURIComponent(data.data);
          api.success({
            message: '登陆成功',
          });
        } else if (data.code == 401) {
          console.log('未登录');
        } else {
          api.error({
            message: data.msg,
          });
        }
      });
  }

  function getParam(key: string, defaultValue = '') {
    return searchParams.get(key) || defaultValue;
  }

  function onSubmit() {
    form.validateFields().then((value) => {
      http
        .post('/server/sso/doLogin', value, {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            localStorage.setItem('ssoToken', data.data.ssoToken);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            // dispatch
            setUser(data.data.user);

            api.info({
              message: `登录成功`,
              duration: 200,
            });
            if (params.client && params.redirect) redirectUrl();
            else navigate('/index');
          } else {
            api.error({
              message: data.msg,
            });
          }
        })
        .catch(({ message, response }) => {
          api.error({
            message: (response && response.data.msg) || message,
          });
        });
    });
  }

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Form
        name='basic'
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={style['login-form']}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='用户名'
          name='name'
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='密码'
          name='pwd'
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='login-button' type='primary' onClick={onSubmit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Context.Provider>
  );
};

export default connect(null, { setUser })(Login);
