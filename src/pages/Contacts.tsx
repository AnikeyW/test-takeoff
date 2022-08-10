

import { Button, Col, Input, Row, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { deleteContact, getContacts } from '../actions/actionCreators';
import ModalAddContact from '../components/ModalAddContact';
import ModalEditContact from '../components/ModalEditContact';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IContact } from '../models/contact';

const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const Contacts: FC = () => {
   const dispatch = useAppDispatch()
   const { contacts, error, isLoading } = useAppSelector(state => state.contactsSlice)
   const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
   const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
   const [editContact, setEditContact] = useState<IContact>({ id: '', lastname: '', name: '' });
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [searchedContacts, setSearchedContacts] = useState<IContact[]>([]);

   useEffect(() => {
      dispatch(getContacts())
   }, [])

   const searchContacts = useMemo(() => {
      if (searchQuery === "") {
         setSearchedContacts(contacts)
      } else {
         const filteredContacts = contacts.filter(contact => {
            return `${contact.name}${contact.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
         })
         setSearchedContacts(filteredContacts)
      }
   }, [searchQuery, contacts])

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

   const changeSearchQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };

   return (
      <div>
         <ModalAddContact isAddModalVisible={isAddModalVisible} setIsAddModalVisible={setIsAddModalVisible} />
         <ModalEditContact
            isModalEditVisible={isModalEditVisible}
            setIsModalEditVisible={setIsModalEditVisible}
            editContact={editContact}
         />
         <Row justify='center'>
            <div className='searh_input'>
               <Input placeholder="Поиск" value={searchQuery} onChange={changeSearchQueryHandler} />
            </div>
         </Row>
         <Row justify='center' style={{ margin: '5px 0px' }} className="row_custom">
            <Col span={24}>
               <Row justify='end'>
                  <Button
                     onClick={showAddModal}
                     type="primary"
                  >Добавить контакт</Button>
               </Row>
            </Col>
         </Row>
         <Row justify='center' className="row_custom">
            <Col span={24}>
               {isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spin indicator={antIcon} />
               </div> :
                  <>
                     {error !== "" && <div>{error}</div>}
                     {searchedContacts.length === 0 && <div>Нет контактов.</div>}
                     {contacts && searchedContacts.map(contact =>
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
                           <div >
                              <div style={{ margin: '0px 5px' }}>Имя: {contact.name}</div>
                              <div style={{ margin: '0px 5px' }}>Фамилия: {contact.lastname}</div>
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
                                 danger
                              >Удалить</Button>
                           </div>

                        </Space>
                     )}
                  </>
               }
            </Col>
         </Row>
      </div>
   );
};

export default Contacts;