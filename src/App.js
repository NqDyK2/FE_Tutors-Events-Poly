import React from 'react';
import { Helmet } from 'react-helmet-async';

import './App.css';
import { ScrollToTop } from './components/ScrollToTop';
import AppRoutes from './routes/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Helmet>
        <title>Tutors Event - FPOLY</title>
        <meta name='description' content='Tutors Event - FPOLY' />
      </Helmet>
      <ScrollToTop>
        <AppRoutes />
      </ScrollToTop>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
