import React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles/App.css';
import './styles/table.css'
import { ScrollToTop } from './components/ScrollToTop';
import AppRoutes from './routes/routes';
import { ToastContainer} from 'react-toastify';
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
