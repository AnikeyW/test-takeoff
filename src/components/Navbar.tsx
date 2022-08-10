import { Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';
import { loginSlice } from '../store/reducers/loginSlice';

const Navbar: FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.authSlice.isAuth)
   const userEmail = useAppSelector(state => state.loginSlice.userEmail)

   const logoutHandler = () => {
      dispatch(loginSlice.actions.setUserSuccess(""))
      dispatch(authSlice.actions.setIsAuth(false))
      navigate('/login')
   }
   return (
      <Header>
         <Row justify='center'>
            <Col span={20}>
               <Row justify='end'>
                  <Menu theme='dark' mode='horizontal' selectable={false}>
                     {isAuth &&
                        <>
                           <Menu.Item>{userEmail}</Menu.Item>
                           <Menu.Item onClick={logoutHandler}>
                              выйти
                           </Menu.Item>
                        </>
                     }
                  </Menu>
               </Row>
            </Col>
         </Row>
      </Header>
   );
};

export default Navbar;