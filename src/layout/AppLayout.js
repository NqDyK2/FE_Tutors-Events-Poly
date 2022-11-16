import React, { useState } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/Header';
import AppAside from '../components/Aside';
import AppBreadcrumb from '../components/AppBreadcrumb';
import AppFooter from '../components/Footer';

const AppLayout = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/welcome');
  //   }
  // }, [isAuthenticated]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout className="tw-min-h-screen" hasSider>
        <AppAside collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className="site-layout dark:tw-bg-[#1b1c1f]">
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* Breadcrumb */}
          <AppBreadcrumb />
          <Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
            }}
            className="tw-mt-4"
          >
            <div className="tw-mb-4 tw-min-h-full tw-bg-white tw-p-6 tw-shadow-md dark:tw-bg-[#202125]">
              {/* This is the content */}
              <Outlet />
              {/* This is the content */}
            </div>
          </Content>

          <div className="tw-p-2"></div>
          {/* Footer */}
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
