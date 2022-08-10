import { Input, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { fetchEditContact } from '../actions/actionCreators';
import { useAppDispatch } from '../hooks/redux';
import { IContact } from '../models/contact';

interface ModalEditContactProps {
   isModalEditVisible: boolean;
   setIsModalEditVisible: (isModalVisible: boolean) => void;
   editContact: IContact;
}

const ModalEditContact: FC<ModalEditContactProps> = ({ isModalEditVisible, setIsModalEditVisible, editContact }) => {
   const dispatch = useAppDispatch()
   const [name, setName] = useState<string>("");
   const [lastname, setLastName] = useState<string>("");

   useEffect(() => {
      setName(editContact.name)
      setLastName(editContact.lastname)
   }, [editContact])

   const handleOk = () => {
      setIsModalEditVisible(false);
      dispatch(fetchEditContact(editContact.id, { id: editContact.id, name, lastname }))
      setName("")
      setLastName("")
   };

   const handleCancel = () => {
      setIsModalEditVisible(false);
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
      <Modal title="Редактировать контакт" visible={isModalEditVisible} onOk={handleOk} onCancel={handleCancel}>
         <Input placeholder="Имя" value={name} onChange={changeNameHandler} style={{ margin: '5px 0' }} />
         <Input placeholder="Фамилия" value={lastname} onChange={changeLastnameHandler} />
      </Modal>
   );
};

export default ModalEditContact;