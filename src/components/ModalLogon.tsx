import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { IData, IUser } from '../models/user';
import { loginSlice } from '../store/reducers/loginSlice';
import { AppDispatch } from '../store/store';

interface ModalLogonProps {
   isModalLogonVisible: boolean;
   setIsModalLogonVisible: (isModalLogonVisible: boolean) => void;
   showAlert: () => void;
}

const ModalLogon: FC<ModalLogonProps> = ({ isModalLogonVisible, setIsModalLogonVisible, showAlert }) => {
   const dispatch = useAppDispatch()
   const [form] = Form.useForm();

   const addUser = (data: IData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(loginSlice.actions.fetchUsers())
         await axios.post<IUser>('users', data)
         dispatch(loginSlice.actions.addUserSuccess())
         setIsModalLogonVisible(false);
         form.resetFields()
         showAlert()
      } catch (error) {
         console.error(error);
         dispatch(loginSlice.actions.fetchUsersError("Не удалось загрузить пользователей"))
      }
   }

   const handleCancel = () => {
      setIsModalLogonVisible(false);
   };

   const onFinish = (values: any) => {
      dispatch(addUser({ email: values.email, password: values.password }))
   };

   return (
      <Modal
         title="Регистрация"
         visible={isModalLogonVisible}
         footer={null}
         onCancel={handleCancel}
      >
         <Form
            form={form}
            name="register"
            onFinish={onFinish}
         >
            <Form.Item
               name="email"
               label="E-mail"
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
               <Input />
            </Form.Item>

            <Form.Item
               name="password"
               label="Пароль"
               rules={[
                  {
                     required: true,
                     message: 'Введите пароль!',
                  },
               ]}
               hasFeedback
            >
               <Input.Password />
            </Form.Item>

            <Form.Item
               name="confirm"
               label="Подтверждение пароля"
               dependencies={['password']}
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Введите пароль повторно!',
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают!'));
                     },
                  }),
               ]}
            >
               <Input.Password />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

               <Form.Item style={{ display: 'inline-block' }}>
                  <Button type="ghost" onClick={handleCancel}>
                     Отмена
                  </Button>
               </Form.Item>

               <Form.Item style={{ display: 'inline-block', marginLeft: '5px' }}>
                  <Button type="primary" htmlType="submit" >
                     Зарегистрироваться
                  </Button>
               </Form.Item>
            </div>
         </Form>
      </Modal>
   );
};

export default ModalLogon;