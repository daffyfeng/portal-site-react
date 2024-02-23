import style from './index.module.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Row, Col } from 'antd';
import http from '@/utils/http';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '@/redux/actions/userInfo';
import { createPngImage, createRandomCode } from '@/utils/common';
import AES from '@/utils/aes';

type FieldType = {
  username?: string;
  password?: string;
  code?: string;
};

const Context = React.createContext({ name: 'Default' });

const Login = ({ setUser }: any) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [captchaImage, setCaptchaImage] = useState('');
  const [key, setKey] = useState('');

  const fetchCaptcha = () => {
    const key = createRandomCode(24, 16);
    setKey(key);
    try {
      http
        .get('/auth/captcha', { key }, { responseType: 'arraybuffer' })
        .then(({ data }) => {
          return setCaptchaImage(createPngImage(data));
        });
    } catch (error) {
      console.error('Error fetching captcha:', error);
    }
  };

  useEffect(() => {
    localStorage.clear();
    fetchCaptcha();
  }, []);

  function onSubmit() {
    form.validateFields().then(({ code, username, password }) => {
      const params = {
        key,
        code,
        username: AES.encrypt(username),
        password: AES.encrypt(password),
        grant_type: 'password',
      };
      http
        .post('/auth/oauth/token', params, {
          headers: {
            Authorization: 'Basic Y21pY3Q6MTIzNDU2', //请求头信息
            serialize: true,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          getUser().then(() => {
            api.info({
              message: `登录成功`,
              duration: 200,
            });
            navigate('/index');
          });
        })
        .catch(({ message, response }) => {
          api.error({
            message: (response && response.data.msg) || message,
          });
        });
    });
  }

  const getUser = () => {
    return http.get('auth/user').then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data.principal));
      setUser(data.principal);
    });
  };

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
          name='username'
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label='验证码'
          name='code'
          rules={[{ required: true, message: '请输入验证码!' }]}
        >
          <Row align='middle'>
            <Col span={14}>
              <Input />
            </Col>
            <Col span={10}>
              {captchaImage && (
                <img src={captchaImage} onClick={fetchCaptcha} />
              )}
            </Col>
          </Row>
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
