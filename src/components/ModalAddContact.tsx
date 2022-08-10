import { Button, Form, Input, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { addContact } from '../actions/actionCreators';
import { useAppDispatch } from '../hooks/redux';

interface ModalAddContactProps {
   isAddModalVisible: boolean;
   setIsAddModalVisible: (isAddModalVisible: boolean) => void;
}

const ModalAddContact: FC<ModalAddContactProps> = ({ isAddModalVisible, setIsAddModalVisible }) => {
   const dispatch = useAppDispatch()
   const [name, setName] = useState<string>("");
   const [lastname, setLastName] = useState<string>("");
   const [form] = Form.useForm();

   const handleCancel = () => {
      setIsAddModalVisible(false);
      setName("")
      setLastName("")
   };

   const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };

   const changeLastnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
   };

   const onFinish = () => {
      dispatch(addContact({ name, lastname }))
      setName("")
      setLastName("")
      setIsAddModalVisible(false);
      form.resetFields();
   };

   return (
      <Modal
         title="Добавить новый контакт"
         visible={isAddModalVisible}
         footer={null}
         onCancel={handleCancel}
      >
         <Form
            form={form}
            name="addContact"
            onFinish={onFinish}
         >
            <Form.Item
               name="contactname"
               rules={[{ required: true, message: 'Введите имя контакта!' }]}
            >
               <Input placeholder="Имя" value={name} onChange={changeNameHandler} />
            </Form.Item>

            <Form.Item
               name="contactlastname"
               rules={[{ required: true, message: 'Введите фамилию контакта!' }]}
            >
               <Input placeholder="Фамилия" value={lastname} onChange={changeLastnameHandler} />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

               <Form.Item style={{ display: 'inline-block' }}>
                  <Button type="ghost" onClick={handleCancel}>
                     Отмена
                  </Button>
               </Form.Item>

               <Form.Item style={{ display: 'inline-block', marginLeft: '5px' }}>
                  <Button type="primary" htmlType="submit" >
                     Ок
                  </Button>
               </Form.Item>
            </div>

         </Form>
      </Modal>
   );
};

export default ModalAddContact;