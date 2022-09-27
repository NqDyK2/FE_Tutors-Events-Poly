import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import App from './App';
import './index.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/vi_VN';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <ConfigProvider locale={locale}>
            <App />
          </ConfigProvider>
        </HelmetProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
