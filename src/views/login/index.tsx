import style from './index.module.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import http from '@/utils/http';
import React, { useEffect, useMemo } from 'react';

type FieldType = {
  name?: string;
  pwd?: string;
};

const Context = React.createContext({ name: 'Default' });

export default function Login() {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const params = {
      client: getParam('client', ''),
      redirect: getParam('redirect', ''),
      mode: getParam('mode', ''),
    };
    http
      .post('/server/sso/getRedirectUrl', params, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
      .then(({ data }) => {
        if (data.code == 200) {
          setTimeout(() => {
            location.href = decodeURIComponent(data.data);
          }, 2000);

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
  }, []);

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
            localStorage.setItem('satoken', data.data);
            api.info({
              message: `登录成功`,
              duration: 200,
            });
            navigate('/index');
          } else {
            api.error({
              message: data.msg,
            });
          }
        })
        .catch(({ message, response }) => {
          api.error({
            message: response.data.msg || message,
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
}
