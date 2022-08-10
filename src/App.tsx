import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

function App() {
  return (
    <Layout style={{ height: '100%' }}>
      <Navbar />
      <Row justify='center'>
        <Content style={{ padding: '5px', maxWidth: '1200px' }}>
          <AppRouter />
        </Content>
      </Row>
    </Layout>
  );
}

export default App;
