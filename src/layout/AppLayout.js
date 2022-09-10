import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from '../components/Header';
import AppAside from '../components/Aside';
import AppBreadcrumb from '../components/AppBreadcrumb';
import AppFooter from '../components/Footer';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/welcome');
  //   }
  // }, [isAuthenticated]);

  return (
    <div>
      <Layout className='tw-min-h-screen' hasSider>
        <AppAside collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className='site-layout'>
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
            }}
          >
            {/* Breadcrumb */}
            <AppBreadcrumb />

            <div className='tw-bg-white tw-p-6 tw-min-h-full tw-shadow-md tw-mb-4'>
              {/* This is the content */}
              <Outlet />
              {/* This is the content */}
            </div>
          </Content>

          <div className='tw-p-8'></div>
          {/* Footer */}
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
