import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollToTop } from './components/ScrollToTop';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import './styles/table.css';
import './styles/ant_override.css';
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
        position='top-right'
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
