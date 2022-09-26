import React from 'react';
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


  return (
    <div>
      <Layout className='tw-min-h-screen' hasSider>
        <AppAside />

        <Layout className='site-layout dark:tw-bg-slate-700'>
          <AppHeader />

          {/* Breadcrumb */}
          <AppBreadcrumb />
          <Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
            }}
            className="tw-mt-4"
          >
            <div className='tw-bg-white dark:tw-bg-[#1E2139] dark:tw-shadow-slate-700  tw-p-6 tw-min-h-full tw-shadow-md tw-mb-4'>
              {/* This is the content */}
              <Outlet />
              {/* This is the content */}
            </div>
          </Content>

          <div className='tw-p-2'></div>
          {/* Footer */}
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
