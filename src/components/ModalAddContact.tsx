import { Input, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { addContact } from '../actions/actionCreators';
import { useAppDispatch } from '../hooks/redux';

interface ModalAddContactProps {
   isAddModalVisible: boolean;
   setIsAddModalVisible: (isAddModalVisible: boolean) => void;
}

const ModalAddContact: FC<ModalAddContactProps> = ({ isAddModalVisible, setIsAddModalVisible }) => {
   const dispatch = useAppDispatch()
   const [name, setName] = useState("");
   const [lastname, setLastName] = useState("");


   const handleOk = () => {
      setIsAddModalVisible(false);
      dispatch(addContact({ name, lastname }))
      setName("")
      setLastName("")
   };

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

   return (
      <Modal title="Добавить новый контакт" visible={isAddModalVisible} onOk={handleOk} onCancel={handleCancel}>
         <Input placeholder="Имя" value={name} onChange={changeNameHandler} />
         <Input placeholder="Фамилия" value={lastname} onChange={changeLastnameHandler} />
      </Modal>
   );
};

export default ModalAddContact;