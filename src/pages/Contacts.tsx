

import { Button, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { deleteContact, getContacts } from '../actions/actionCreators';
import ModalAddContact from '../components/ModalAddContact';
import ModalEditContact from '../components/ModalEditContact';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IContact } from '../models/contact';

const Contacts: FC = () => {
   const dispatch = useAppDispatch()
   const { contacts, error, isLoading } = useAppSelector(state => state.contactsSlice)
   const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
   const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
   const [editContact, setEditContact] = useState<IContact>({ id: '', lastname: '', name: '' });


   useEffect(() => {
      dispatch(getContacts())
   }, [])


   const showAddModal = () => {
      setIsAddModalVisible(true);
   };

   const deleteContactHandler = (id: string) => {
      dispatch(deleteContact(id))
   };

   const editContactHandler = (contact: IContact) => {
      setEditContact(contact)
      setIsModalEditVisible(true);
   };


   return (
      <div>
         <ModalAddContact isAddModalVisible={isAddModalVisible} setIsAddModalVisible={setIsAddModalVisible} />
         <ModalEditContact
            isModalEditVisible={isModalEditVisible}
            setIsModalEditVisible={setIsModalEditVisible}
            editContact={editContact}
         />
         <Button
            onClick={showAddModal}
            type="primary"
         >Добавить контакт</Button>

         {error !== "" && <div>{error}</div>}
         {isLoading && <div>Загрузка контактов...</div>}
         {contacts && contacts.map(contact =>
            <Space
               key={contact.id}
               style={{
                  display: 'flex',
                  margin: '5px 0px',
                  justifyContent: 'space-between',
                  border: '1px solid lightgrey',
                  padding: '2px'
               }}
            >
               <div style={{ display: 'flex' }}>
                  <div>Имя: {contact.name}</div>
                  <div>Фамилия: {contact.lastname}</div>
               </div>
               <div style={{ display: 'flex' }}>
                  <Button
                     onClick={() => editContactHandler(contact)}
                     type="primary"
                     style={{ margin: '0px 5px' }}
                  >Редактировать</Button>
                  <Button
                     onClick={() => deleteContactHandler(contact.id)}
                     type="primary"
                     style={{ margin: '0px 5px' }}
                  >Удалить</Button>
               </div>

            </Space>
         )}
      </div>
   );
};

export default Contacts;