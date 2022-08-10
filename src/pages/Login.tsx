import { Button, Form, Input, Layout, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';
import ModalLogon from '../components/ModalLogon';
import { AppDispatch } from '../store/store';
import { IData, IUser } from '../models/user';
import axios from 'axios';
import { loginSlice } from '../store/reducers/loginSlice';



const Login: FC = () => {
   const [form] = Form.useForm();
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [isModalLogonVisible, setIsModalLogonVisible] = useState<boolean>(false);

   const showAlert = () => {
      message.success('Регистрация прошла успешно!');
   }
   const showErrorAlert = () => {
      message.error('Пользователь с таким Email не найден!');
   }

   const login = (data: IData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(loginSlice.actions.fetchUsers())
         const response = await axios.get<IUser[]>('users')
         const users = response.data
         if (users.length === 0) {
            showErrorAlert()
            form.resetFields()
         } else {
            if (users.find(user => user.email === data.email)) {
               if (users.find(user => user.email === data.email)?.password === data.password) {
                  dispatch(loginSlice.actions.setUserSuccess(data.email))
                  dispatch(authSlice.actions.setIsAuth(true))
                  navigate('/')
               }
            } else {
               showErrorAlert()
               form.resetFields()
            }
         }

      } catch (error) {
         console.error(error);
         dispatch(loginSlice.actions.fetchUsersError("Не удалось загрузить пользователей"))
      }
   }

   const onFinish = (value: any) => {
      dispatch(login(value))
   };

   const showModalLogon = () => {
      setIsModalLogonVisible(true);
   };

   return (
      <Layout>
         <ModalLogon isModalLogonVisible={isModalLogonVisible} setIsModalLogonVisible={setIsModalLogonVisible} showAlert={showAlert} />
         <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               <Form
                  form={form}
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
               >
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           type: 'email',
                           message: 'Непохоже на E-mail!',
                        },
                        {
                           required: true,
                           message: 'Введите ваш E-mail!',
                        },
                     ]}
                  >
                     <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                  >
                     <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                     />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                     </Button>
                     <span style={{ margin: '0px 5px' }}>или</span>
                     <span
                        onClick={showModalLogon}
                        style={{ cursor: 'pointer', color: 'blue' }}
                     >Зарегистрироваться!</span>
                  </Form.Item>
               </Form>
            </div>

         </Content>
      </Layout>
   );
};

export default Login;